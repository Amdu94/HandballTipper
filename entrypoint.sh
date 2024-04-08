#!/bin/sh

# Check if the .env file exists
if [ ! -f backend/.env ]; then
  # Check if all required arguments are provided
    if [ $# -ne 2 ]; then
      echo "Usage: $0 <database> <port>"
      exit 1
    fi

  # Create the .env file with the necessary credentials
  echo "MONGO_URL=$1" > backend/.env
  echo "PORT=$2" >> backend/.env
  # Commented out line (if needed later)
  # 8080
fi
