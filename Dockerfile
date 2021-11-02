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
CMD ["npm", "run", "start-dev"]

# docker build -t fastify-node-app-image .

# Mount ( Volume bind ) the current directory to the container and run the app
# -d (detached)
# -p (port)
# -v (volume) [sourceLocation:destinationLocation:mode(ro - read only)]
# -v is mentioned again to avoid overriding of node_modules if its not present in source.
# --name (container name)

# docker run -p 3000:3000 -d -v $(pwd):/app:ro -v /app/node_modules --name fastify-node-app fastify-node-app-image
