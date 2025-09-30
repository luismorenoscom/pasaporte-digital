FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache python3 make g++

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
