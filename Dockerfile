FROM node:18

WORKDIR /app
COPY . .

WORKDIR /app/client
RUN npm i
RUN npm install -g @angular/cli
RUN ng build

WORKDIR /app/server
RUN npm i
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
