# Product Utilities Web Application

This project is a web-based utility application designed to manage product-related functionalities and email notifications. Built with React (Next.js), it includes key features like user authentication, product and category management, and dynamic interactions with external APIs.

## Features

### 1. User Authentication
- **Sign Up and Sign In**: Secure user authentication system with seamless navigation between sign-up and sign-in pages.
- **Session Management**: Tokens for maintaining user sessions.

### 2. Product Utilities
- **Calculate Product Price**: Enter a product ID to fetch and calculate the price using a backend API.
- **Add Products**: A dedicated section to add new products dynamically.

### 3. Category Management
- **Add Categories**: Easily manage product categories through the intuitive interface.

### 4. Email Notifications
- **Send Email**: Allows sending structured email notifications to recipients.

### 5. User Feedback
- **Loading States**: Visual feedback during API calls.
- **Success & Error Messages**: Clear and non-overlapping notifications for user actions.

---

## Tech Stack

### Frontend
- **Framework**: Next.js
- **UI Styling**: Tailwind CSS

### Backend
- **API**: Custom APIs for price calculation, email notifications, and product management
- **Base URL**: `https://product-price-board.onrender.com`

### State Management
- **React Hooks**: `useState` for managing component state.

---


---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-repo-link.git
```

2. Navigate to the project directory:
```bash
cd project-directory
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

---

## Environment Variables

```
NEXT_PUBLIC_API_BASE_URL=https://product-price-board.onrender.com
```

---

## Usage

1. **Sign Up / Sign In**:
   - Navigate to the Sign-Up page to create an account.
   - Use the Sign-In page to log into the application.

2. **Calculate Price**:
   - Enter the product ID and click "Calculate Price".

3. **Send Email Notification**:
   - Fill in the recipient email, subject, and message body fields, then click "Send Email".

4. **Manage Categories and Products**:
   - Navigate to the respective sections to add categories and products.

---

## Contact

For any inquiries, please contact:
- **Email**: support@productutilitiesapp.com
- **Author**: Arthur Onyeanusi

---

Enjoy using the Product Price-Board Web Application!

