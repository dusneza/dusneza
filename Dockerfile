FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy server code
COPY server ./server

# Copy client code
COPY client ./client
WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

EXPOSE 5000

CMD ["npm", "start"]
