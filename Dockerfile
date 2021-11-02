FROM node:15

WORKDIR /app

# Splitting the build into two steps to take advantage of docker cache
# Wont rerun npm install unless there is a change in the package.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the app to the build directory
COPY . ./


EXPOSE 3000

# Run the app
CMD ["node", "index.js"]

# docker build -t fastify-node-app-image .
# docker run -p 3000:3000 -d --name fastify-node-app fastify-node-app-image
