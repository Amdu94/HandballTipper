# Stage 1: Build the React.js application

FROM node:21-alpine AS development
LABEL authors="dulai.adam"

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install
# RUN npm install react-scripts -g

# copy app files
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
