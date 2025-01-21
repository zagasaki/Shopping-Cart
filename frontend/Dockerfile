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

# Build aplikasi React
RUN npm run build

# Expose port untuk server frontend
EXPOSE 3000

# Gunakan nginx untuk serving frontend
RUN npm install -g serve
CMD ["npm","start"]
