# Gunakan base image node versi 14
FROM node:14

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json .

# Install dependensi proyek
RUN npm install

# Salin seluruh proyek ke dalam container
COPY . .

# CMD yang akan dijalankan ketika container dijalankan
CMD ["node", "app.js"]
