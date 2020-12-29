FROM node:7.7.2-alpine
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8080
EXPOSE 3000
# CMD [ "npm", “run”, "dev" ]