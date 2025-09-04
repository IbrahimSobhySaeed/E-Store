# E-Commerce Store - Angular 19 with FakeStore API

A modern, responsive e-commerce application built with Angular 19, TypeScript, SCSS, and the FakeStore API. This application demonstrates the use of Angular signals for state management and implements all endpoints from the FakeStore API.

## Features

- 🛍️ **Product Management**

  - Browse all products with grid layout
  - Search and filter products
  - Sort by price (ascending/descending)
  - View detailed product information
  - Product ratings and reviews display

- 📁 **Category Management**

  - Browse products by category
  - Category statistics (product count, average price)
  - Visual category cards with icons

- 🛒 **Shopping Cart**

  - Add/remove products from cart
  - Update quantities
  - Persistent cart (localStorage)
  - Real-time cart total calculation
  - Cart item count in header

- 👤 **User Authentication**

  - Login functionality
  - User profile display
  - Demo credentials provided
  - Protected routes

- 📱 **Responsive Design**

  - Mobile-first approach
  - Adaptive layouts for all screen sizes
  - Touch-friendly interfaces
  - Hamburger menu for mobile navigation

- ⚡ **Modern Technologies**
  - Angular 19 with signals
  - Standalone components
  - TypeScript strict mode
  - SCSS with CSS variables
  - Lazy loading routes

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Ecommerce
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Demo Credentials

The application uses the FakeStore API authentication. You can use these demo credentials:

- **User 1:**

  - Username: `mor_2314`
  - Password: `83r5^_`

- **User 2:**
  - Username: `johnd`
  - Password: `m38rmF$`

## API Endpoints Used

This application implements all available FakeStore API endpoints:

### Products

- GET `/products` - Get all products
- GET `/products/{id}` - Get single product
- GET `/products?limit={number}` - Limit results
- GET `/products?sort={asc|desc}` - Sort products
- GET `/products/categories` - Get all categories
- GET `/products/category/{category}` - Get products by category

### Cart

- GET `/carts` - Get all carts
- GET `/carts/{id}` - Get single cart
- GET `/carts/user/{userId}` - Get user carts
- GET `/carts?startdate={date}&enddate={date}` - Get carts in date range

### Users

- GET `/users` - Get all users
- GET `/users/{id}` - Get single user
- GET `/users?limit={number}` - Limit results
- GET `/users?sort={asc|desc}` - Sort users

### Authentication

- POST `/auth/login` - User login

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── category-products/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── home/
│   │   ├── loading/
│   │   ├── login/
│   │   ├── product-card/
│   │   ├── product-detail/
│   │   ├── products/
│   │   └── profile/
│   ├── models/
│   │   ├── product.model.ts
│   │   └── user.model.ts
│   ├── services/
│   │   └── fakestoreapi.service.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── styles.scss
├── index.html
└── main.ts
```

## Key Features Implementation

### Angular Signals

- Used for reactive state management
- Cart state with computed values
- Loading states
- User authentication state

### Responsive Design

- CSS Grid and Flexbox layouts
- Mobile-first media queries
- Adaptive navigation
- Touch-optimized interactions

### Performance

- Lazy loaded routes
- Optimized images with lazy loading
- Efficient state management
- Minimal re-renders with signals

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
