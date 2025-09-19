# Jowhara Collection - Luxury Fragrance E-commerce

A complete, production-ready React + Vite e-commerce platform for luxury fragrances with Supabase backend and WhatsApp ordering integration.

## Features

### Frontend
- ✨ Modern React 18 + TypeScript + Vite
- 🎨 Beautiful UI with Tailwind CSS and custom fonts
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🛍️ Complete e-commerce functionality
- 💬 WhatsApp ordering integration
- 🔍 Product search and filtering
- 🏷️ Brand and category browsing

### Backend
- 🔐 Supabase authentication and authorization
- 📊 PostgreSQL database with Row Level Security
- 🖼️ File storage for product images
- 👥 Role-based admin system

### Admin Panel
- 📋 Full CRUD operations for products, brands, categories
- 📦 Order management with status tracking
- 👨‍💼 User role management
- 📈 Clean dashboard interface

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Routing**: React Router
- **UI Components**: Headless UI, Heroicons
- **Fonts**: Playfair Display (serif), Inter (sans-serif)

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd jowhara-collection
npm install
```

### 2. Setup Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key from Settings > API
3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_WHATSAPP_NUMBER=254700000000
```

### 3. Setup Database

1. Open Supabase SQL Editor
2. Copy and run the migration file: `supabase/migrations/001_initial_schema.sql`
3. Optionally, run the seed data: `scripts/seed.sql`

### 4. Create Admin User

1. Go to your Supabase project > Authentication > Users
2. Create a new user with email/password
3. Copy the user's UUID from the Users table
4. Run this SQL in the SQL Editor:

```sql
INSERT INTO app_users (auth_uid, email, role)
VALUES ('user-uuid-here', 'admin@example.com', 'admin');
```

### 5. Add Assets

Replace placeholder files in the `public/` directory:
- `public/logo.png` - Your company logo
- `public/favicon.ico` - Your favicon
- `public/hero.jpg` - Hero section background image

### 6. Start Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER`
4. Deploy!

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin panel components
│   ├── Header.tsx      # Main navigation
│   ├── Footer.tsx      # Site footer
│   └── ...
├── pages/              # Page components
│   ├── admin/         # Admin panel pages
│   ├── Home.tsx       # Landing page
│   ├── Shop.tsx       # Product listing
│   └── ...
├── contexts/          # React contexts
├── lib/               # Utilities and configurations
├── types/             # TypeScript definitions
└── ...

public/
├── logo.png           # Company logo
├── hero.jpg           # Hero background
├── images/            # Product images
└── brands/            # Brand logos

supabase/
└── migrations/        # Database migrations

scripts/
└── seed.sql          # Sample data
```

## Color Palette

- **Background**: `#FFFFFF` (white)
- **Text Primary**: `#0B0B0B` (very dark charcoal)
- **Text Muted**: `#7A7A7A`
- **Gold Accent**: `#D4AF37`
- **WhatsApp Green**: `#24A54B`

## Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## WhatsApp Integration

Orders are processed via WhatsApp with pre-filled messages including:
- Product name and price
- Quantity selected
- Total price
- Product page URL

Configure your WhatsApp number in the environment variables.

## Admin Features

The admin panel (`/admin`) includes:

- **Products**: Add, edit, delete products; manage stock and featured status
- **Categories**: Organize products into categories
- **Brands**: Manage brand information and logos
- **Orders**: View and update order statuses

Access requires admin role in the `app_users` table.

## Database Schema

### Tables
- `products` - Product catalog with pricing, stock, images
- `brands` - Brand information and logos
- `categories` - Product categories
- `orders` - Customer orders via WhatsApp
- `app_users` - User roles and admin access

### Security
- Row Level Security (RLS) enabled on all tables
- Public read access for products, brands, categories
- Admin-only access for data modifications
- Role-based authentication system

## Development Notes

- All product images should be optimized for web
- Use Pexels URLs for stock photos in development
- Implement proper error handling for all API calls
- Test responsive design on multiple screen sizes
- Verify WhatsApp links work on mobile devices

## Support

For issues and questions, please check the documentation or create an issue in the repository.

---

Built with ❤️ for luxury fragrance retail.