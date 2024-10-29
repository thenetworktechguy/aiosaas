# Build Node frontend
FROM node:23.0.0-alpine AS builder-node

WORKDIR /app

COPY . .
RUN npm i pnpm@9 -g && pnpm i
RUN pnpm i --frozen-lockfile --prod=false
RUN node --run build:client

# Build golang backend
FROM golang:1.23-alpine AS builder-golang

WORKDIR /app
COPY . .
COPY --from=builder-node /app/dist ./dist
RUN go mod download
RUN go build -tags production -o pocket-react

# Final stage
FROM alpine:latest

# Copy the built executable from builder stage
COPY --from=builder-golang /app/pocket-react /usr/local/bin/pocket-react

# Install LiteFS
RUN apt-get update && apt-get install -y ca-certificates fuse3 sqlite3

COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs
# Copy LiteFS config
COPY litefs.yml /etc/litefs.yml

# Create necessary directories for FUSE and set permissions
RUN mkdir -p /litefs /var/lib/litefs && \
    chown node:node /litefs /var/lib/litefs

EXPOSE 8090

CMD litefs mount
