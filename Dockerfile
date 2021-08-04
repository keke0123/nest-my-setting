FROM node:14.17-alpine AS builder
WORKDIR /project/

# Install dependencies for building
RUN apk update && apk add python2 g++ make && rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:14.17-alpine
WORKDIR /project/

# Install dependencies for bcrypt
RUN apk update && apk add python2 g++ make && rm -rf /var/cache/apk/*

COPY package*.json ./
RUN npm install --production && npm cache clean --force

COPY --from=builder /project/dist ./dist

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "run", "start:prod"]