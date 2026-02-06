# Use the official Node.js image as a base
# FROM node:23-slim

# installing git. Needed by some npm packages
# RUN apt-get update && apt-get install -y


# Set working directory in the container
# WORKDIR /app

# Copy package.json and install dependencies
# COPY package.json package-lock.json ./
# RUN npm i --force

# Copy the entire project into the container
# COPY . .

# Build the Angular app
# RUN npm run build

# Use Nginx to serve the built Angular app
FROM nginx:stable-alpine

# Install unzip
RUN apk add --no-cache unzip

# set working dir in container
WORKDIR /usr/share/nginx/html

# copy local build
COPY dist.zip .


# Unzip the build
RUN unzip dist.zip && rm dist.zip && \
    mv dist/main/* . && \
    rm -rf dist

# Copy project files.
# COPY --from=0 /app/dist /usr/share/nginx/html

#Copy Custom Nginx Configuration.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
