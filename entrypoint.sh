#!/bin/sh

# Check if the .env file exists
if [ ! -f backend/.env ]; then

  # Prompt for database URL
  read -p "Enter the MongoDB database URL: " mongo_url

  read -p "Enter the API key: " api_key

  # Prompt for port
  read -p "Enter the port number: " port

  # Create the .env file with the provided values
  echo "MONGO_URL=$mongo_url" > backend/.env
  echo "API_KEY=$api_key" > backend/.env
  echo "PORT=$port" >> backend/.env

fi

