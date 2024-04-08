FROM node:21-alpine AS development

LABEL authors="dulai.adam"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 8000

RUN npx prisma generate

CMD ["npm", "start"]
