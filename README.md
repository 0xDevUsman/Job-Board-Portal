# Job Board Portal — Next.js Full-Stack Application

A modern, full-stack Job Board Portal built with [Next.js](https://nextjs.org) (App Router), featuring **role-based authentication** using [NextAuth.js](https://next-auth.js.org), separate dashboards for employees and recruiters, and a fully responsive UI powered by Tailwind CSS.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Project Structure](#project-structure)  
- [Authentication & Authorization](#authentication--authorization)  
- [Middleware & Route Protection](#middleware--route-protection)  
- [Responsive Design](#responsive-design)  
- [Deployment](#deployment)  
- [License](#license)  
- [Contact](#contact)  

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

- **Multi-role Authentication:** Employee, Recruiter, and Admin user roles with distinct access rights  
- **NextAuth.js Integration:** Supports Credentials and OAuth providers  
- **Protected Routes:** Middleware enforces authentication and role-based access  
- **Responsive UI:** Tailwind CSS for mobile-first design  
- **Next.js App Router:** Modern routing with server and client components  
- **Profile Management:** Users can update their profile information dynamically  
- **Clean Code Structure:** Scalable and maintainable codebase  

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS  
- **Backend:** Next.js API routes, Node.js  
- **Authentication:** NextAuth.js (Credentials, Google, GitHub)  
- **Database:** MongoDB (with preferred ODM)  
- **Deployment:** Vercel  

---

## Getting Started

### Prerequisites

- Node.js v18 or higher  
- npm, yarn, pnpm, or bun  
- MongoDB connection URI  
- OAuth credentials for Google and GitHub (optional)  
- NextAuth secret key  

### Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/0xDevUsman/Job-Board-Portal.git
cd job-board-portal
npm install
