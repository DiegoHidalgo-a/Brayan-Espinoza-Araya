# Brayan Espinoza - Athlete Portfolio

A modern, production-ready e-commerce platform built with React, TypeScript, and Excel-based data management.

## 🚀 Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Complete product management with categories, pricing, and inventory
- **Shopping Cart**: Add to cart, quantity management, and checkout process
- **Order Management**: Full order lifecycle from creation to delivery
- **Payment Integration**: SINPE Móvil and PayPal payment options with proof upload
- **User Authentication**: Secure login system with member areas

### 📊 Excel-Based Data Management
- **Product Management**: Import/export products via Excel files
- **Order Export**: Download order data in Excel format
- **Newsletter Management**: Export/import subscriber lists
- **No Database Required**: All data stored locally with Excel backup/restore

### 🎨 Modern Design
- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Smooth Animations**: Framer Motion powered interactions
- **Premium UI**: Apple-level design aesthetics with attention to detail
- **Dark/Light Themes**: Elegant color schemes and typography

### 🔧 Admin Features
- **Admin Dashboard**: Complete order and product management
- **Real-time Notifications**: Order updates and system alerts
- **Analytics**: Sales metrics and inventory tracking
- **Excel Integration**: Bulk operations via spreadsheet import/export

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Data Management**: Excel (XLSX) + localStorage
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Admin/          # Admin panel components
│   ├── Navigation.tsx  # Main navigation
│   ├── Footer.tsx      # Site footer
│   └── ...
├── contexts/           # React Context providers
│   ├── ProductContext.tsx    # Product management
│   ├── OrderContext.tsx      # Order management
│   ├── CartContext.tsx       # Shopping cart
│   └── AuthContext.tsx       # Authentication
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── ProductPages/   # Category pages
│   └── AdminPanel.tsx  # Admin dashboard
└── types/              # TypeScript definitions
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📊 Excel Data Management

### Product Data Format
The system uses Excel files with the following columns:
- `id`: Unique product identifier
- `name`: Product name
- `price`: Product price (number)
- `original_price`: Original price for sale items
- `description`: Product description
- `category`: Product category
- `primary_image`: Main product image URL
- `secondary_image`: Secondary image URL
- `is_new`: Boolean for new products
- `is_sale`: Boolean for sale items
- `is_limited_edition`: Boolean for limited items
- `is_exclusive`: Boolean for exclusive items
- `stock_quantity`: Available inventory
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Order Data Export
Orders are exported with complete customer information:
- Order details and status
- Customer information and shipping address
- Payment method and reference
- Item details and quantities
- Timestamps and notes

### Newsletter Subscribers
Simple format with:
- Email address
- Subscription date
- Unique ID

## 🔐 Authentication

### Demo Credentials
- **Admin**: fortysixpluss@gmail.com / DiegoyNoah2006
- **User**: fortysixpluss@gmail.com / user123

## 🎯 Key Features

### For Customers
- Browse products by category
- Search functionality
- Shopping cart and checkout
- Order tracking
- Member area with order history

### For Administrators
- Complete product management
- Order processing and status updates
- Customer information management
- Excel import/export for bulk operations
- Real-time notifications
- Sales analytics

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Optimized images and performance

## 🔧 Customization

### Adding New Products
1. Use the admin panel to add products individually
2. Or prepare an Excel file with product data and import

### Managing Orders
1. View all orders in the admin dashboard
2. Update order status and add notes
3. Export order data for external processing

### Newsletter Management
1. Subscribers are automatically collected
2. Export subscriber lists for email marketing
3. Import existing subscriber lists

## 🚀 Deployment

The application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.