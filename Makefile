# Makefile

.PHONY: init dev build setup-env

# Initialize the project
init: setup-env
	@echo "Installing frontend dependencies..."
	cd frontend && pnpm install
	@echo "Installing backend dependencies..."
	go mod tidy

# Set up environment files
setup-env:
	@if [ ! -f backend/.env ]; then \
		cp .env.example .env; \
		echo "Created .env"; \
	fi
	@if [ ! -f frontend/.env ]; then \
		cp frontend/.env.example frontend/.env; \
		echo "Created frontend/.env"; \
	fi

# Run development mode
dev:
	@echo "Starting development servers..."
	make -j 2 dev-frontend dev-backend

dev-frontend:
	cd frontend && node --run dev

dev-backend:
	go run . serve

# Build for production
build:
	@echo "Building frontend..."
	cd frontend && node --run build
	@echo "Building backend..."
	cd backend && go build -o ../app main.go

# Run in production mode
run:
	GO_ENV=production ./app serve
