Blood Connect Project Tech Stack
Frontend Technologies
HTML5

Used for structuring the web pages
Semantic elements for better accessibility and SEO
CSS3

Used for styling the application
Custom styles in assets/css/styles.css
Tailwind CSS (v2.2.19)

Utility-first CSS framework
Used for responsive design and rapid UI development
Loaded via CDN: https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css
JavaScript (ES6+)

Vanilla JavaScript for client-side functionality
No frontend framework like React or Vue.js is used
Organized in modular pattern with separate files for different functionalities
Lucide Icons

Icon library loaded from https://unpkg.com/lucide@latest
Used for UI elements throughout the application
Fetch API

Used for making HTTP requests to the backend
Implemented in assets/js/services/api.js
LocalStorage API

Used for client-side storage of authentication tokens and user data
Implemented in authentication service
Backend Technologies
Node.js

JavaScript runtime for server-side code
Version 18.20.5 as indicated in the logs
Express.js

Web application framework for Node.js
Handles routing, middleware, and HTTP requests
MongoDB

NoSQL database for storing application data
Connected via MongoDB Atlas cloud service
Mongoose

ODM (Object Data Modeling) library for MongoDB and Node.js
Used for schema definition and data validation
Supabase

Backend-as-a-Service platform
Used for authentication services
Implemented via @supabase/supabase-js client library
JSON Web Tokens (JWT)

Used for secure authentication
Configured with expiration time of 7 days
dotenv

Environment variable management
Used to load configuration from .env files
CORS

Cross-Origin Resource Sharing middleware
Configured to allow requests from the frontend GitHub Pages domain
DevOps & Deployment
Git & GitHub

Version control system
GitHub Pages for frontend hosting
GitHub repository for code storage and collaboration
Railway

PaaS (Platform as a Service) for backend deployment
Handles environment variables and application hosting
Project Architecture
Client-Server Architecture

Decoupled frontend and backend
Communication via RESTful API
MVC Pattern (Backend)

Models: MongoDB schemas
Views: N/A (API-only backend)
Controllers: Route handlers in separate controller files
Service-Based Architecture (Frontend)

Modular JavaScript with separate services for:
API communication
Authentication
User management
Blood donation requests
Donation centers
Security Features
Authentication

JWT-based authentication
Secure password handling via Supabase
Rate Limiting

API rate limiting to prevent abuse
Configured in middleware/rateLimit.js
CORS Protection

Restricted API access to authorized origins
Environment Variable Protection

Sensitive data stored in environment variables
Not exposed to client-side code
Additional Tools
Email Service

Configuration for sending emails (SMTP)
Used for password reset and notifications
Toast Notifications

Custom toast notification system
