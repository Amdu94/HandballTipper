FROM node:21-alpine
LABEL authors="dulai.adam"

WORKDIR /app

# add '/app/node_modules/.bin' to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package*.json ./

RUN npm install
# RUN npm install react-scripts -g

# copy app files
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
