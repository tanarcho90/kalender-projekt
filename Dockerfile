# 1. Basis-Image für Node.js (hier Version 18 verwendet)
FROM node:18-alpine

# 2. Arbeitsverzeichnis erstellen
WORKDIR /app

# 3. Nur package.json und package-lock.json kopieren (für sauberen Installationsprozess)
COPY package.json package-lock.json ./

# 4. Abhängigkeiten installieren
RUN npm install --production

# 5. App-Dateien kopieren
COPY . .

# 6. Port freigeben (3000 ist Standard, falls dein Server auf einem anderen Port läuft, ändere ihn hier)
EXPOSE 3000

# 7. Start der Anwendung (falls du "npm start" nutzt, passt das bereits)
CMD ["npm", "start"]
