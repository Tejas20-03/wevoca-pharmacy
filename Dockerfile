FROM node:18.13.0-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . /app

RUN npm run build

CMD ["npm", "run", "start"]