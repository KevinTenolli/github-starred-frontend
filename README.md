# Frontend App Readme

## Description

This frontend application complements the backend, providing a user interface for interacting with the proxy server that saves starred repositories and collects commit counts periodically. This project also utilizes Docker for easy deployment and relies on environment variables specified in a `.env.development` file.

## Setup

To run the frontend project, follow these instructions:

1. Duplicate the `.env` file to create a new `.env.development` file.

    ```bash
    cp .env .env.development
    ```

   Fill in the necessary values in the new `.env.development` file.

2. Build and run the application using Docker Compose.

    ```bash
    docker-compose up -d --build
    ```

This sets up the environment, builds the Docker containers, and starts the frontend application.

## Extra Information
   When configuring the OAUTH app, the redirect url should be http://localhost:5173/login

## Docker Compose

The provided `docker-compose.yml` file sets up the necessary containers for the frontend application. The `-d` flag runs the containers in the background.