FROM node:alpine as builder

WORKDIR /app
COPY ./package.json ./
RUN npm install --silent
CMD ["npm", "run", "build"]
COPY . .

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /use/share/nginx/html
