# Use a Node.js base image
FROM node:alpine

# Set the working directory
WORKDIR /

# Install dependencies


# Copy React app files into the container
COPY . /app/my-react-app

# Set the working directory for the app
WORKDIR /app/my-react-app

# Install app dependencies
RUN npm install

# Expose the port that the app is running on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]