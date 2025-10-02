#!/usr/bin/env bash
set -euo pipefail

# Remote deploy script executed on the VPS by GitHub Actions.
# Required environment on the VPS: sudo installed, user able to sudo without password or GitHub Actions uses a key for a user with appropriate privileges.

DOMAIN=ironman.embluegroup.com
REPO_DIR=/opt/pasaporte
REPO_URL="https://github.com/luismorenoscom/pasaporte-digital.git"
WEB_ROOT=/var/www/pasaporte

# Args: repo_tarball deploy_env
REPO_TARBALL=${1:-}
DEPLOY_ENV_FILE=${2:-}

echo "Remote deploy start: $(date)"

echo "1) Ensure sudo and git are present"
sudo apt update -y
sudo apt install -y git docker.io docker-compose nginx certbot python3-certbot-nginx

sudo systemctl enable --now docker || true

echo "2) Populate repo directory"
if [ -n "${REPO_TARBALL}" ] && [ -f "${REPO_TARBALL}" ]; then
  echo "Using uploaded tarball: ${REPO_TARBALL}"
  sudo rm -rf "${REPO_DIR}"
  sudo mkdir -p "${REPO_DIR}"
  sudo tar -xzf "${REPO_TARBALL}" -C "${REPO_DIR}" --strip-components=0
else
  if [ -d "${REPO_DIR}/.git" ]; then
    cd "${REPO_DIR}"
    sudo git fetch --all
    sudo git reset --hard origin/main
  else
    sudo rm -rf "${REPO_DIR}"
    sudo git clone "${REPO_URL}" "${REPO_DIR}"
  fi
fi

echo "3) Build frontend inside container"
sudo docker run --rm -v "${REPO_DIR}:/app" -w /app node:18-alpine sh -lc "apk add --no-cache git python3 make g++ && npm ci && npm run build"

echo "4) Copy static files to web root"
sudo rm -rf "${WEB_ROOT}"
sudo mkdir -p "${WEB_ROOT}"
sudo cp -r "${REPO_DIR}/dist/." "${WEB_ROOT}/"
sudo chown -R www-data:www-data "${WEB_ROOT}"

echo "5) Ensure nginx config"
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled
cat >/tmp/ironman.conf <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name DOMAIN_PLACEHOLDER;

    root WEB_ROOT_PLACEHOLDER;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /socket.io/ {
        proxy_pass http://127.0.0.1:3001/;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
NGINX

sudo sed -i "s|DOMAIN_PLACEHOLDER|${DOMAIN}|g" /tmp/ironman.conf
sudo sed -i "s|WEB_ROOT_PLACEHOLDER|${WEB_ROOT}|g" /tmp/ironman.conf
sudo mv /tmp/ironman.conf /etc/nginx/sites-available/${DOMAIN}
sudo ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
sudo nginx -t
sudo systemctl reload nginx

echo "6) Start docker-compose"
cd "${REPO_DIR}"
sudo docker-compose pull || true
sudo docker-compose pull || true

# If a deploy env file was provided, copy it to repo and ensure docker-compose uses it
if [ -n "${DEPLOY_ENV_FILE}" ] && [ -f "${DEPLOY_ENV_FILE}" ]; then
  echo "Using deploy env file: ${DEPLOY_ENV_FILE}"
  sudo cp "${DEPLOY_ENV_FILE}" "${REPO_DIR}/.env"
  sudo chown root:root "${REPO_DIR}/.env"
fi

sudo docker-compose up -d --build

echo "7) Obtain TLS cert with certbot"
sudo certbot --nginx -d "${DOMAIN}" --non-interactive --agree-tos -m admin@${DOMAIN} || true

echo "Remote deploy finished: $(date)"
