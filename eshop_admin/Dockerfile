FROM node:14-slim
WORKDIR /dashboard
COPY . .
RUN yarn install
EXPOSE 4000
CMD ["yarn", "start"]