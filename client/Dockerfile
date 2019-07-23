# Do the npm install or yarn install in the full image
FROM mhart/alpine-node AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile --production
RUN yarn build

# And then copy over node_modules, etc from that stage to the smaller base image
FROM mhart/alpine-node:base
WORKDIR /app
COPY --from=builder /app .
COPY server.js .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]