FROM node:12-alpine

RUN mkdir -p /usr/app/node_modules && chown -R node:node /usr/app
WORKDIR /usr/app

USER node

# Install dependencies
COPY package.json yarn.* ./
RUN yarn --network-timeout 1000000 

# Copy app source
COPY --chown=node:node . .

# Transpile code
# RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]