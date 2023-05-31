#!/bin/bash

# Start the container
docker-compose up -d

# Wait for the container to start
sleep 5

# Open the frontend in the default browser
start google-chrome --app=http://localhost:3001