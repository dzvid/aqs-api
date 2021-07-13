FROM node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 1000000 
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]