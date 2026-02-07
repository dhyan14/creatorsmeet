#!/bin/sh
# Railway entrypoint for code-server

# Use Railway's PORT or default to 8080
PORT=${PORT:-8080}

# Start code-server
exec code-server --bind-addr "0.0.0.0:$PORT" --auth password
