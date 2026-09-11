# Eastern Sidama Cultural Tourism Platform

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](backend/CONTRIBUTING.md)

A full-stack web platform connecting travelers with authentic cultural experiences in **Eastern Sidama, Ethiopia**. Discover coffee ceremonies, culinary traditions, music, wildlife, and more through local hosts and guides.

## Features

- **Experience Discovery** - Browse and search curated cultural tours and home experiences
- **Booking System** - Book experiences with real-time availability and confirmation
- **Host Portal** - Apply to become a host; manage your listings and bookings
- **Guide Portal** - Apply to become a certified local guide
- **Wallet & Payouts** - Hosts earn ETB; request withdrawals via mobile money
- **Interactive Map** - Explore locations visually across the region
- **Cultural Guides** - Built-in guides for coffee, cuisine, music, wildlife, and more
- **Messaging** - Real-time messaging between travelers and hosts
- **Reviews** - Leave and read authentic reviews
- **Wishlist** - Save favorite experiences for later
- **Notifications** - Stay updated on bookings and messages
- **Dark Mode** - Full dark/light theme support

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| UI Components | shadcn/ui, Radix UI |
| State Management | React Context, TanStack Query |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, Email Verification |
| File Uploads | Multer |
| Email | Nodemailer |

## Project Structure

```
eastern-sidama/
├── frontend/        # React + TypeScript frontend (Vite)
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Route-level page components
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utility functions
│       └── contexts/    # React context providers
└── backend/         # Node.js + Express API
    ├── controllers/ # Route handlers
    ├── models/      # Mongoose schemas
    ├── routes/      # Express routers
    ├── middlewares/ # Custom middleware
    ├── utils/       # Helper utilities
    └── services/    # Business logic services
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- npm or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbenezerMathewos/eastern-sidama-cultural-tourism-platform.git
   cd eastern-sidama-cultural-tourism-platform
   ```

2. **Setup the backend**
   ```bash
   cd backend
   cp config.env.example .env
   npm install
   npm start
   ```

3. **Setup the frontend**
   ```bash
   cd frontend
   cp .env.local.example .env.local
   npm install
   npm run dev
   ```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](backend/CONTRIBUTING.md) and our [Code of Conduct](CODE_OF_CONDUCT.md) before submitting a PR.

## Security

Found a vulnerability? Please read [SECURITY.md](SECURITY.md) for responsible disclosure guidelines.

## License

This project is licensed under the MIT License.