# Stage 1: Build the React.js application

FROM node:21-alpine
LABEL authors="dulai.adam"

WORKDIR /app

COPY package*.json ./

RUN npm install
# RUN npm install react-scripts -g

# copy app files
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
