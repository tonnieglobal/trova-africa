# Trova Africa - Advertising Agency Website

A modern, responsive advertising agency website built with React, TypeScript, Tailwind CSS, and Supabase backend.

![Trova Africa Website](https://images.unsplash.com/photo-1774014045654-7a36a73ca401?w=1200)

## Features

- **Modern React Stack**: Built with React 18, TypeScript, and Vite
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Multi-language Support**: English, French, Swahili, and Spanish
- **Supabase Backend**: Contact form submissions stored in Supabase database
- **Drone Footage Video**: Homepage features aerial billboard footage
- **Portfolio Showcase**: Dynamic project gallery with filtering
- **Contact Form**: Fully functional form with validation

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **Backend**: Supabase (PostgreSQL + Auth)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router v7

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase account (for backend features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trova-africa.git
cd trova-africa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Set up Supabase database:
   - Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:5173/ in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/     # React components
│   ├── context/        # Language context
│   ├── pages/          # Page components
│   ├── App.tsx
│   └── routes.tsx
├── lib/
│   └── supabase.ts     # Supabase client
├── styles/             # CSS files
└── main.tsx

supabase/
└── schema.sql          # Database schema
```

## Pages

- **Home**: Hero section, stats, drone footage video, CTA
- **Services**: 6 service offerings with details
- **About**: Company story, mission/vision, team
- **Portfolio**: Project showcase with filtering
- **Contact**: Contact form with Supabase integration

## Supabase Integration

The contact form submits data to a Supabase PostgreSQL database. The schema includes:

- `contact_submissions`: Stores contact form data
- `newsletter_subscriptions`: Stores newsletter signups
- `portfolio_projects`: Dynamic portfolio content

## Deployment

### Deploy to Vercel/Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/` folder
3. Add environment variables in your hosting platform

## License

MIT License - feel free to use this project for your own purposes.

## Credits

- Design: Trova Africa Ltd
- Images: Unsplash
- Icons: Lucide React
- UI Components: shadcn/ui
