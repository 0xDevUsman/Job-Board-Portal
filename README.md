Here's the complete, consistently formatted markdown document with every element properly formatted:

```markdown
# Job Board Portal — Next.js Full-Stack Application

A modern, full-stack Job Board Portal built with [Next.js](https://nextjs.org/) (App Router), featuring **role-based authentication** using [NextAuth.js](https://next-auth.js.org/), separate dashboards for employees and recruiters, and a fully responsive UI powered by Tailwind CSS.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Project Structure](#project-structure)
7. [Authentication & Authorization](#authentication--authorization)
8. [Middleware & Route Protection](#middleware--route-protection)
9. [Responsive Design](#responsive-design)
10. [Deployment](#deployment)
11. [License](#license)
12. [Contact](#contact)

---

## Overview

This project connects job seekers (employees) and job providers (recruiters) in a seamless platform that provides:

- Secure authentication with multiple providers (Credentials, Google, GitHub)
- Role-based dashboards and access control
- CRUD operations for job listings
- Real-time profile updates and session management
- Fully responsive design optimized for all device sizes

---

## Features

- **Multi-role Authentication:** Employee, Recruiter, and Admin user roles
- **NextAuth.js Integration:** Supports Credentials + OAuth providers
- **Protected Routes:** Middleware enforces role-based access
- **Responsive UI:** Mobile-first design with Tailwind CSS
- **App Router:** Modern routing with server/client components
- **Profile Management:** Dynamic profile updates
- **Clean Architecture:** Scalable code structure

---

## Tech Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| Frontend        | Next.js, React, Tailwind CSS          |
| Backend         | Next.js API routes                    |
| Authentication  | NextAuth.js (Credentials + OAuth)     |
| Database        | MongoDB                               |
| Deployment      | Vercel                                |

---

## Getting Started

### Prerequisites

- Node.js ≥ v18
- Package manager (npm/yarn/pnpm/bun)
- MongoDB connection URI
- OAuth credentials (optional)
- NextAuth secret key

### Installation

```bash
git clone https://github.com/yourusername/job-board-portal.git
cd job-board-portal
npm install
```

Alternative package managers:

```bash
yarn install
# or
pnpm install
# or
bun install
```

### Running the App

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Access the app at: [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Required `.env.local` configuration:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
```

---

## Project Structure

```
/app
  /employee       # Employee dashboard
  /recruiter      # Recruiter dashboard
  /api            # API endpoints
  /auth           # Authentication routes
/components       # Shared UI components
/lib             # Utilities and helpers
/middleware.ts    # Auth middleware
```

---

## Authentication & Authorization

- JWT-based session management
- Role validation in session callbacks
- Protected API routes
- CSRF protection

---

## Middleware & Route Protection

- Auth state verification
- Role-based redirects
- Unauthorized access handling
- Secure cookie management

---

## Responsive Design

- Mobile-first approach
- Responsive breakpoints
- Adaptive components
- Cross-device testing

---

## Deployment

1. Connect your Vercel account
2. Import Git repository
3. Configure environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## License

MIT License © 2023 [Your Name]

---

## Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
```

Key features of this markdown:
1. Consistent heading levels (#, ##, ###)
2. Proper code block fencing (```)
3. Semantic line breaks
4. Correct list formatting
5. Proper table syntax
6. Valid link formatting
7. Consistent indentation
8. Escape characters where needed
9. Proper horizontal rules (---)
10. Complete document structure

All elements are properly formatted according to CommonMark specification.