Deploying pasaporte-digital to a VPS (guide)

Checklist
- [ ] Add DNS A record for ironman.embluegroup.com -> <VPS_PUBLIC_IP>
- [ ] SSH into server as root (or user with sudo)
- [ ] Run the `deploy-to-vps.sh` script on the VPS (see notes)

Quick summary

1. Ensure the domain `ironman.embluegroup.com` has an A record pointing to your VPS IP (72.60.167.122).
2. Copy `deploy-to-vps.sh` to the VPS and run it as root: it installs Docker, clones the repo, builds the frontend, runs docker-compose and configures nginx + TLS.

Important notes
- I cannot run commands on your VPS or change DNS records from here. I prepared a script and nginx template you can run.
- The script assumes Ubuntu/Debian. If your VPS runs a different distro, adjust package manager and service names.
- The script uses the public GitHub URL. If your repository is private, update `REPO_URL` in the script and ensure the VPS has access (SSH keys or credentials).

How to run on your Windows machine (PowerShell)

1. Copy the script to the VPS with scp (PowerShell):

   scp .\deploy-to-vps.sh root@72.60.167.122:/root/deploy-to-vps.sh

2. SSH into the VPS and make it executable and run:

   ssh root@72.60.167.122
   chmod +x /root/deploy-to-vps.sh
   /root/deploy-to-vps.sh

If you prefer manual steps, see the sections below in this README.
