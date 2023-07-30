# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install
CMD ["node", "pages/index.js"]
EXPOSE 3001