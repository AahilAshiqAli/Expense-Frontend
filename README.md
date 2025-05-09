# Expense Tracker

This repository only contains the frontend. To access the backend, please visit the [backend repository](https://github.com/AahilAshiqAli/Expense-Backend).

This project aims to build a robust and optimized **Expense Tracker**.

## 🔧 Features

- 📊 **Spending Breakdown by Category**

  - View monthly graphs for spending.
  - Visual representation of each category's spending in relation to total expenses.

- 📁 **Budgeting by Category**

  - Create custom categories.
  - Set limits on your budget per category.
  - Track how much you've spent against your set budget for each category.

- 📄 **Transaction History**

  - Paginated view of all transactions (both income and expenses).

- ➕ **Add Expense / Income**

  - Simple form to add new transactions.

- ⚙️ **Optimization Focus**

  - No state management tools like Zustand used.
  - Fully optimized using **React Query**.
  - Clear distinction between **server state** and **client state**.

- 🚨 **Error Handling**

  - All errors are gracefully handled.
  - Custom **error page** is included.

- 👥 **Multi-user Support**

  - Includes a **login page**.
  - Token is stored in `localStorage`.
  - Regular checks via a `me` API to ensure the token is valid and user is authenticated.

- 🔐 **Protected Routes**

  - All routes are protected based on authentication.

- 📦 **Clean Architecture**
  - **Separation of Concerns** is strictly followed.
  - Logic is encapsulated using the **Repository Pattern**.

## 🛠️ Project Backend Structure

    Routes
    ↓
    Middleware
    ↓
    Controllers (only handle request/response)
    ↓
    Services (OOP-based business logic)
    ↓
    Repositories (OOP inheritance for data access)
    ↓
    Entities / Models

---

This project follows best development practices, with well-structured modules and a focus on scalability and maintainability.

---

<h1>How to run the code</h1>

1. **Clone the repository**

```bash
git clone https://github.com/AahilAshiqAli/Expense-Frontend.git
```

2. **Navigate to the project folder**

```bash
cd Expense-Frontend
```

3. **Install dependencies**
   if you dont have pnpm installed, visit this link: https://pnpm.io/installation

```bash
pnpm install
```

3. Start the development server

```bash
pnpm run dev
```
