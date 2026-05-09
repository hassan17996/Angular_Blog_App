# Minimalist B&W Blog - Angular 21

A high-contrast, professional blog application built with Angular 21, featuring a minimalist Black & White UI and a robust, modern architecture.

## 🚀 Features
- **Angular 21:** Built with the latest stable version of Angular.
- **Modern Reactivity:** Uses Angular **Signals** for efficient state management.
- **Sleek UI/UX:** High-contrast B&W design, fully responsive for mobile and desktop.
- **Authentication:** Secure sign-in and sign-up flow with local storage persistence.
- **Content Management (CRUD):** Full create, read, update, and delete functionality for blog entries.
- **Route Protection:** Secure guards to prevent unauthorized access to composition tools.
- **Minimalist Architecture:** Clean, module-based structure without unnecessary dependencies.

## 🛠️ Prerequisites
- **Node.js:** Latest LTS version recommended.
- **npm:** Included with Node.js.

## 🏁 Getting Started

### 1. Install Dependencies
Run the following command in the project root:
```bash
npm install
```

### 2. Start the Backend API
The project uses `json-server` as a mock backend. Start it in a separate terminal:
```bash
npm run api
```
This will start the server at `http://localhost:3000`.

### 3. Start the Angular Application
In another terminal, start the development server:
```bash
npm start
```
The application will be available at `http://localhost:4200`.

## 🧪 Testing Credentials
You can use the following account to test the authenticated features:
- **Email:** `dev@example.com`
- **Password:** `password123`

## 📂 Project Structure
- `src/app/articles`: Contains the feed and entry list logic.
- `src/app/auth`: Handles identity management (Sign In / Sign Up).
- `src/app/editor`: Contains the composition tools for writing entries.
- `src/app/services`: Core logic for API interaction and state management.
- `src/app/guards`: Route protection logic.

---
Built with 🖤 for high-contrast enthusiasts.
