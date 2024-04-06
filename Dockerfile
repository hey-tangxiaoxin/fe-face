FROM node:16

WORKDIR /app

RUN git clone https://github.com/ziluo-tang/nest-server.git
RUN npm install
RUN npm run build

CMD node dist/main