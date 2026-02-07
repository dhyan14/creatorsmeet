#!/bin/sh
# Railway entrypoint for code-server

# Use Railway's PORT or default to 8080
export PORT=${PORT:-8080}

# Start code-server with proper bind address
exec /usr/bin/code-server --bind-addr 0.0.0.0:${PORT} --auth password
