FROM node:18

WORKDIR /app

COPY ../../package*.json ./
COPY ../../apps/event ./apps/gateway

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start:dev","gateway"]
