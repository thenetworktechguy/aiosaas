# Makefile

.PHONY: init dev build

# Initialize the project
init:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Installing air..."
	go install github.com/air-verse/air@latest
	@echo "Installing backend dependencies..."
	cd backend && go mod tidy

# Run development mode
dev:
	@echo "Starting development servers..."
	make -j 2 dev-frontend dev-backend

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && GO_ENV=development air

# Build for production
build:
	@echo "Building frontend..."
	cd frontend && npm run build
	@echo "Building backend..."
	cd backend && go build -o ../app main.go

# Run in production mode
run:
	./app serve