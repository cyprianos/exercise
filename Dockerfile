FROM node:latest
COPY . ./app
WORKDIR /app

RUN yarn && yarn build

RUN yarn global add serve
EXPOSE 80

CMD ["serve", "-s","build", "-l", "80"]