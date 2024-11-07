# Gunakan image Node.js sebagai base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file source code ke dalam container
COPY . .

# Expose port untuk server backend
EXPOSE 5000

# Run aplikasi backend
CMD ["npm", "start"]
