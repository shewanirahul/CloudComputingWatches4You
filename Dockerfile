FROM node:7 
WORKDIR /server 
COPY package.json /server 
RUN npm install
COPY  .  /server 
CMD node server.js 
EXPOSE 8080