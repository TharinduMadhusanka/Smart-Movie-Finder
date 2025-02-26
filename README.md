# SmartMovieFinder

## How to Run This Docker App

### Prerequisites

- Docker and Docker Compose installed on your machine

### Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/SmartMovieFinder.git
   cd SmartMovieFinder
   ```

2. **Create a `.env` file:**

   Create a `.env` file in the root directory and add your environment variables. For example:

   ```env
   API_KEY=your_api_key_here
   ```

3. **Build and run the Docker containers:**

   ```sh
   docker-compose up --build
   ```

4. **Access the application:**

   - Frontend: Open your web browser and go to `http://localhost:3000`.
   - Backend: Open your web browser and go to `http://localhost:5000`.

### Additional Commands

- **Stop the Docker containers:**

  ```sh
  docker-compose down
  ```

- **Rebuild the Docker containers:**

  ```sh
  docker-compose up --build
  ```

- **View Docker Compose logs:**

  ```sh
  docker-compose logs
  ```

- **Run Docker Compose in detached mode:**

  ```sh
  docker-compose up -d
  ```

Replace `your_api_key_here` with your actual API key.
