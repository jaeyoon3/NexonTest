FROM node:18

WORKDIR /app

COPY ../../package*.json ./
COPY ../../apps/event ./apps/event

RUN npm install

COPY . .

# .env 파일 복사
ENV MONGODB_URI=mongodb://my_mongodb:27017/event-db

EXPOSE 4002

CMD ["npm", "run", "start:dev","event"]