FROM node:15

WORKDIR /app

# Splitting the build into two steps to take advantage of docker cache
# Wont rerun npm install unless there is a change in the package.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the app to the build directory
COPY . ./

# Run the app
CMD ["npm", "run", "start-dev"]

