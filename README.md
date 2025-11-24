# Stock Management Frontend

A modern, comprehensive stock management application built with **Angular 20** and **Angular Material**. This application provides a robust interface for managing inventory, sales, purchases, and business entities.

## Features

### Authentication & User Management

- **Login & Registration**: Secure access for users.
- **Profile Management**: Update general information and change passwords.

### Dashboard

- **Home Page**: Overview of the system status and quick actions.

### Inventory Management

- **Product Management**: Create, read, update, and delete (CRUD) products.
- **Inventory Movement**: Track stock levels and history of movements.

### Sales Management

- **New Sale**: Process new sales transactions efficiently.
- **Sale History**: View and filter past sales records.
- **Sale Details**: Deep dive into specific transaction information.

### Purchases Management

- **New Purchase**: Record new stock acquisitions.
- **Purchase History**: Keep track of all procurement activities.
- **Purchase Details**: View detailed information about specific purchases.

### Entity Management

- **Customers**: Manage customer profiles and data.
- **Suppliers**: Maintain a database of suppliers and their details.

## Technology Stack

- **Framework**: [Angular v20](https://angular.io/)
- **UI Component Library**: [Angular Material](https://material.angular.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: SCSS
- **State/Async**: RxJS

## Getting Started

### Prerequisites

Ensure you have **Node.js** installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/LuizFTS/stockmanagementfrontend.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd stockmanagementfrontend
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

Run the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building

Build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

- `src/app/pages`: Contains all the main views (Auth, Inventory, Sales, Purchases, etc.).
- `src/app/layouts`: Defines the main application layouts (e.g., HomeLayout).
- `src/app/core`: Core services and singleton objects.
- `src/app/shared`: Reusable components and utilities.
