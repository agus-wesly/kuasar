FROM node:18-alpine3.17 as builder
RUN npm install -g npm@10.5.0
RUN npm install -g serve
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["serve", "-s", "-l", "8080", "./dist"]

# FROM nginx:alpine as production-build
# COPY nginx.conf /etc/nginx/nginx.conf
# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*
# # Copy from the stage 1
# COPY --from=builder /dist /usr/share/nginx/html
# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
