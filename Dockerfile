FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

EXPOSE 3001

ENTRYPOINT ["npm", "start"]
