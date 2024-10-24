# Makefile

.PHONY: init dev build setup-env

# Initialize the project
init: setup-env
	@echo "Installing frontend dependencies..."
	cd frontend && pnpm install
	@echo "Installing air..."
	go install github.com/air-verse/air@latest
	@echo "Installing backend dependencies..."
	cd backend && go mod tidy

# Set up environment files
setup-env:
	@if [ ! -f backend/.env ]; then \
		cp backend/.env.example backend/.env; \
		echo "Created backend/.env"; \
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
	cd backend && air

# Build for production
build:
	@echo "Building frontend..."
	cd frontend && node --run build
	@echo "Building backend..."
	cd backend && go build -o ../app main.go

# Run in production mode
run:
	GO_ENV=production ./app serve
