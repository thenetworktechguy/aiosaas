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
RUN apk add --no-cache ca-certificates bash fuse3 sqlite curl
RUN go mod download
RUN go build -tags production -o pocket-react

# Final stage
FROM alpine:latest

# Copy the built executable from builder stage
COPY --from=builder-golang /app/pocket-react /usr/local/bin/pocket-react

COPY --from=flyio/litefs:0.5 /usr/local/bin/litefs /usr/local/bin/litefs

# Copy LiteFS config
COPY litefs.yml /etc/litefs.yml

# Create necessary directories for FUSE and set permissions
RUN mkdir -p /pb_data /var/lib/litefs && \
    chown node:node /pb_data /var/lib/litefs

EXPOSE 8090

CMD ["pocket-react", "serve", "--http=0.0.0.0:8090"]
