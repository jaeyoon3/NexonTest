FROM node:18

WORKDIR /app

COPY ../../package*.json ./
COPY ../../apps/event ./apps/auth
RUN npm install

COPY . .

# .env 파일 복사
ENV MONGODB_URI=mongodb://my_mongodb:27017/auth-db

EXPOSE 4001

CMD ["npm", "run", "start:dev","auth"]