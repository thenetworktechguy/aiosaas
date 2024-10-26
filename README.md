# PocketBase + React Single-Binary Project

Ship your full-stack React application as a single executable! 
This project combines the power of PocketBase as a backend with a modern React frontend, all compiled into one easy-to-deploy binary.

## ✨ Features

- **Single Binary Deployment**: Package your entire full-stack application into one executable
- **Built-in Database**: PocketBase includes an embedded SQLite database
- **Auto-generated TypeScript Types**: Automatic type generation from your database schema
- **Modern React Frontend**: Built with Vite for blazing-fast development
- **Type Safety**: Full TypeScript support throughout the stack

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Go (v1.18 or higher)
- pnpm (recommended package manager)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

## 📝 Available Scripts

- `pnpm dev` - Starts all development services concurrently:
  - `dev:types` - Generates TypeScript types from your PocketBase schema
  - `dev:client` - Starts the Vite development server for React
  - `dev:server` - Runs the PocketBase server in development mode

- `pnpm build` - Creates a production build:
  - `build:client` - Builds the React frontend
  - `build:server` - Compiles everything into a single binary named `pocket-react`

- `pnpm format` - Formats code using Biome

## 🏗️ Project Structure

```
.
├── frontend/            # React frontend code
├── pb_data/             # PocketBase data directory
├── pb_migrations/       # Database migrations
└── main.go              # Go entry point
```

## 🔧 About PocketBase

[PocketBase](https://pocketbase.io) is an open source backend consisting of:
- Embedded database (SQLite)
- Built-in authentication
- Real-time subscriptions
- Dashboard UI
- File storage
- Convenient REST API

Why PocketBase is great for this project:
- Zero-dependency backend
- Single binary deployment
- Auto-generated API and admin UI
- Built-in authentication and file storage
- Great developer experience
- Active community and regular updates

## 📦 Building for Production

To create a production build:

```bash
pnpm build
```

This will create a single executable named `pocket-react` that contains your entire application. To run it:

```bash
./pocket-react serve
```

## 🛠️ Development

During development, you can run all services concurrently using:

```bash
pnpm dev
```

This will start:
1. The PocketBase server
2. The Vite development server
3. Type generation in watch mode

## 📚 Additional Resources

- [PocketBase Documentation](https://pocketbase.io/docs/)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

MIT
