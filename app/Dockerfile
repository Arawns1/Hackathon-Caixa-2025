FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG BASE_URL
RUN sed -i "s|__BASE_URL__|$BASE_URL|g" src/environments/environment.ts
RUN npm run build


FROM nginx:alpine
COPY --from=build /app/dist/app-simulacao-emprestimos/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
