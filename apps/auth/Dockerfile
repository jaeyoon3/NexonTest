FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# .env 파일 복사
COPY .env .env

EXPOSE 4001

CMD ["npm", "run", "start:dev"]