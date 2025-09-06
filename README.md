# Green Thumb - Plant E-commerce Website

A modern, responsive e-commerce website for plant enthusiasts built with Next.js 15, TypeScript, and Tailwind CSS v4.

## 🌟 Features

- **Pixel-perfect Design**: Converted from Figma design to fully responsive code
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS v4
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Interactive Shopping Cart**: Add/remove items, adjust quantities
- **Product Filtering**: Sidebar with category and price filters
- **Search & Sort**: Product search and sorting functionality
- **Mobile-First**: Responsive navigation and optimized mobile experience

## 🎨 Design System

### Colors
- **Primary Green**: `#50806B` - Primary buttons, branding
- **Sage Background**: `#E8EDDE` - Hero sections, backgrounds
- **Primary Text**: `#0D0D0D` - Main text content
- **Secondary Text**: `#979797` - Helper text, placeholders
- **Borders**: `#E3E5E5` - Card borders, dividers

### Typography
- **Headings**: Poppins (400, 500, 600, 700)
- **Body Text**: Open Sans (400, 600, 700)
- **Navigation**: Roboto (400, 500)
- **Forms**: Inter (400, 500)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd green-thumb
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind configuration
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main shop page
├── components/
│   ├── Header.tsx           # Site header with navigation
│   ├── Hero.tsx             # Hero section component
│   ├── ProductCard.tsx      # Individual product card
│   ├── FilterSidebar.tsx    # Product filtering sidebar
│   ├── SortDropdown.tsx     # Product sorting dropdown
│   ├── CartSidebar.tsx      # Shopping cart sidebar
│   ├── Footer.tsx           # Site footer
│   └── index.ts             # Component exports
```

## 🛠️ Components

### Header
- Responsive navigation with mobile hamburger menu
- Shopping cart icon with item count
- Top promotional banner
- Logo and main navigation links

### Hero Section
- Large title display
- Subtitle with visual separator
- Responsive background styling

### Product Grid
- Responsive grid layout (1-3 columns based on screen size)
- Product cards with hover effects
- Add to cart functionality

### Filter Sidebar
- Category filtering with expandable sections
- Price range filtering
- Additional filters (planter, flowers, care, heat pack)
- Mobile toggle for filter visibility

### Shopping Cart
- Slide-out sidebar on desktop
- Full-screen overlay on mobile
- Quantity adjustment controls
- Remove items functionality
- Subtotal calculation
- Checkout button

### Footer
- Social media links
- Navigation links
- Copyright information

## 🎯 Features Implemented

### Shop Page
- ✅ Product grid with responsive layout
- ✅ Filter sidebar with categories
- ✅ Sort dropdown with options
- ✅ Product search functionality
- ✅ Add to cart with quantity management

### Shopping Cart
- ✅ Add/remove items
- ✅ Quantity adjustment
- ✅ Real-time subtotal calculation
- ✅ Responsive sidebar design

### Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet and desktop optimizations
- ✅ Touch-friendly interface
- ✅ Accessible navigation

## 🔧 Customization

### Adding New Products
Add products to the `products` array in `src/app/page.tsx`:

```typescript
const products: Product[] = [
  {
    id: 'unique-id',
    name: 'Product Name',
    price: 350,
    image: 'image-url'
  },
  // ...more products
];
```

### Styling Changes
Update colors and styles in `src/app/globals.css`:

```css
:root {
  --colors-dark: #1C275A;
  --green: #50806B;
  --colors-sage: #E8EDDE;
  /* Add your custom colors */
}
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## 📱 Mobile Features

- Touch-friendly interface
- Mobile-optimized cart
- Responsive navigation
- Optimized image loading
- Fast performance on mobile devices

## 🚀 Deployment

This project can be deployed on any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**

For Vercel deployment:
```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce websites
- Built with Next.js and Tailwind CSS
- Icons from Heroicons and custom SVGs
- Images from builder.io assets
