# Angular User Management Application

This is an Angular application for managing user information. It includes features for user signup, login, and CRUD operations on user data. The application uses Angular Material for UI components and integrates with a Flask backend.

## Features

- User signup
- User login
- JWT-based authentication
- CRUD operations on user data
- Export user data to Excel
- Responsive UI with Angular Material

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Build](#build)
- [Docker](#docker)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js and npm
- Angular CLI

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vjamalpure/angular-flask-app.git
   cd angular-user-management

   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create an `environment.ts` file in the `src/environments` folder and add the following:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5000'  // URL of the Flask backend
   };
   ```

## Usage

### Running the Application

1. **Run the Angular application:**

   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`.

### Build

1. **Build the Angular application:**

   ```bash
   ng build
   ```

   The build artifacts will be stored in the `dist/` directory.

## Docker

To containerize the Angular application, use the provided Dockerfile:

### Dockerfile

```dockerfile
# Stage 1: Build the Angular application
FROM node:14 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve the application with nginx
FROM nginx:alpine

COPY --from=build /app/dist/angular-user-management /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
```

### Build the Docker Image

```bash
docker build -t angular-app .
```

### Run the Docker Container

```bash
docker run -d -p 80:80 angular-app
```

The application will be available at `http://localhost`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

This `README.md` file provides a comprehensive guide to setting up, running, and using your Angular application. Adjust the repository URL and any other specific details as needed.