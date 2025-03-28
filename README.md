# Personal Website

A modern, responsive personal website built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🎨 Modern and responsive design
- 🌓 Light/Dark mode
- 📱 Mobile-friendly navigation
- ⚡ Fast page transitions with Framer Motion
- 🔒 Contact form with Supabase integration
- 📝 Dynamic blog posts
- 💼 Project showcase
- 🎯 SEO optimized

## Tech Stack

- **Frontend:**
  - React (Vite)
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - React Router
  - HeadlessUI

- **Backend:**
  - Supabase (Auth, Database, Storage)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/my-website.git
   cd my-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Supabase Setup

1. Create a new Supabase project
2. Create the following tables:
   - `projects`
   - `blog_posts`
   - `contact_messages`

### Table Schemas

```sql
-- Projects table
create table projects (
  id bigint generated by default as identity primary key,
  title text not null,
  description text not null,
  image_url text not null,
  github_url text not null,
  demo_url text,
  technologies text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blog posts table
create table blog_posts (
  id bigint generated by default as identity primary key,
  title text not null,
  excerpt text not null,
  content text not null,
  image_url text,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text not null unique
);

-- Contact messages table
create table contact_messages (
  id bigint generated by default as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider of choice (e.g., Vercel, Netlify).

## Customization

1. Update `src/components/Layout.tsx` with your name and social links
2. Modify the theme colors in `tailwind.config.js`
3. Add your own content to the pages in `src/pages`
4. Update the meta tags in `index.html`

## License

This project is licensed under the MIT License. 