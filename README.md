# 📚 Programming Topics API (Node/Express/MongoDB)



This project is a robust RESTful API built with Node.js, Express, and MongoDB (using Mongoose) to manage a centralized collection of programming topics and a personal, persistent "Learning List."

It serves as an excellent backend foundation for a full-stack learning tracker or an educational resource platform.

## ✨ Features

* **Topic Catalog:** Provides a static list of diverse programming topics (Python, Java, JavaScript) with associated metadata like `difficulty` and `language`.
* **Learning List Management:** A dedicated collection to track which topics a user intends to learn.
* **Intelligent Add Endpoint (`POST /api/learning/add`):**
    * Adds a new topic to the list if it doesn't exist.
    * **Increments the quantity** and recalculates `totalDifficulty` if the topic already exists.
* **Database Seeding:** A utility endpoint (`POST /api/seed`) to reset and populate both the `Topic` and `LearningList` collections with initial, sample data.
* **CORS Enabled:** Ready to be consumed by any frontend application (React, Vue, Angular, etc.).

## 🛠️ Tech Stack

| Technology | Role | Notes |
| :--- | :--- | :--- |
| **Node.js** | JavaScript Runtime | Required for execution. |
| **Express.js** | Web Application Framework | Handles routing and middleware. |
| **MongoDB / Mongoose** | Database & ODM | Data storage and schema definition. |
| **CORS** | Middleware | Enables cross-origin requests. |

## 🚀 Getting Started

### Prerequisites

* **Node.js** (LTS version recommended)
* **MongoDB Instance** (Local or cloud-based like Atlas)

### Installation & Setup
---NOTE INSTALL NODE MODULES I DIDNOT GAVE IT
   BY -
--- cd study-project
--- cd BackEnd
2.  **Install dependencies:**
    ```bash
    npm install express cors mongoose
    ```
3.  **Configure Database:**
    * Ensure your MongoDB connection string is correctly configured within the `connectDB` function in the main server file (or use environment variables for production).
    * *Note: In the single-file example, this is a hardcoded string you must update.*
4.  **Run the server:**
    ```bash
    node server.js 
    # Or 'npm start' if configured
    ```
    The API will be available at `http://localhost:3000`.

## 🧭 API Endpoints

Use a tool like [Postman]() or cURL to interact with the API.

| Method | Endpoint | Description | Request Body Example | Success Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/seed` | **Resets** all data and seeds the initial topics. | N/A | `{"message": "✅ Seeded successfully", "count": 9}` |
| `GET` | `/api/topics` | Retrieves the full list of available topics. | N/A | `[ { name: "Decorators", ... }, ... ]` |
| `GET` | `/api/learning` | Retrieves the user's current learning list. | N/A | `[ { name: "Promises", quantity: 2, ... }, ... ]` |
| `POST` | `/api/learning/add` | Adds a topic (or increments its quantity) to the learning list. | `{ "name": "Promises", "difficulty": 10, "image": "...", "language": "JavaScript" }` | Updated `LearningList` array. |

### Example Test: Seeding the Database

You can verify your setup immediately by sending a request to the seed endpoint:

```bash
# This will clear existing data and insert the initial set of topics.
curl -X POST http://localhost:3000/api/seed
