# Frontend - Art Gallery React Application

## Description
The frontend for the Art Gallery application is developed using **React**, utilizing **useEffect**, **useState**, and other React hooks to manage the application’s state and lifecycle. It fetches data from the backend API to display users, categories, art pieces, and orders. The frontend provides a seamless user experience with features such as cart management, modals, and dynamic display of art gallery data.

## Key Features

### 1️⃣ Fetching Data:
- Used **Axios** to fetch data from the backend and dynamically render it in the frontend.
- Fetching data for **users**, **categories**, **art pieces**, and **orders** and updating the UI accordingly.

### 2️⃣ State Management:
- Utilized **React hooks** like `useState` and `useEffect` for component state management and lifecycle handling.
- Implemented `storeSession` for locally storing cart data to reduce backend calls, ensuring a smooth and efficient user experience.
- Saving **userId** and **JWT token** in **sessionStorage** for authenticated API calls.

### 3️⃣ Routing:
- Used **react-router-dom** for routing between different pages, such as the home page, art piece details, and user login.

### 4️⃣ Cart Management:
- Stored **cart data** locally and retrieved it after user logout or order placement, reducing the number of backend API calls.

### 5️⃣ Modals:
- Implemented modals for actions like **order confirmation**, **login**, and **registration**.

### 6️⃣ CSS Styling:
- Used **CSS** for custom styling to improve the user interface and overall design of the application.

### 7️⃣ Authentication:
- Handling **JWT-based authentication** to ensure secure access to protected routes and actions.

## Tech Stack
- **Frontend Framework**: React
- **Routing**: react-router-dom
- **HTTP Requests**: Axios
- **State Management**: React Hooks (useState, useEffect)
- **Session Storage**: Saving user data (userId, token) in sessionStorage
- **CSS**: Custom styling for UI components
- **Authentication**: JWT Token-based authentication
- **Modals**: For user interactions like login, order confirmation

## Future Plans

### 1️⃣ Filter Criteria:
- I am planning to implement filter criteria to allow users to filter art pieces based on categories, price range, or other criteria.
- This will enhance the browsing experience for users.


### 2️⃣ Other Future Enhancements:
- Improve the **UI/UX** for mobile responsiveness.
- Implement **pagination** or **infinite scroll** for browsing art pieces.
- Add **user preferences** for theme customization (dark/light mode).
- Enhance the **cart experience** with payment integration.

## How to Run Locally

### 1️⃣ Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/art-gallery-frontend.git
```

### 2️⃣ Install Dependencies
Navigate into the project directory:
```bash
cd art-gallery-frontend
```
Install the required dependencies using npm:
```bash
npm install
```

### 3️⃣ Run the Frontend Application
Start the development server:
```bash
npm start
```
The frontend application will be running at:
```bash
http://localhost:3000
```