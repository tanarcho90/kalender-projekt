# 1. Basis-Image für Node.js (leichtgewichtige Version für bessere Performance)
FROM node:18-alpine

# 2. Arbeitsverzeichnis erstellen
WORKDIR /app

# 3. Nur package.json und package-lock.json kopieren (für optimierten Build-Cache)
COPY package.json package-lock.json ./

# 4. Produktionsabhängigkeiten installieren
RUN npm install --production

# 5. App-Dateien kopieren (HTML, CSS, JS, etc.)
COPY . .

# 6. Port freigeben (Standard: 3000)
EXPOSE 3000

# 7. Start der Anwendung (via npm start oder direkt mit node)
CMD ["npm", "start"]
