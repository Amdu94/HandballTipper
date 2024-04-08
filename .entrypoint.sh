#!/bin/sh

# Check if the .env file exists
if [ ! -f .env ]; then
  # Check if all required arguments are provided
    if [ $# -ne 3 ]; then
      echo "Usage: $0 <database> <port>"
      exit 1
    fi

  # Create the .env file with the necessary credentials
  echo "MONGO_URL=$1" > .env
  echo "PORT=$2" >> .env
fi
