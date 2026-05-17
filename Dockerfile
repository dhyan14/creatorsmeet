FROM codercom/code-server:latest

# No password needed - direct access
EXPOSE 10000

CMD ["--bind-addr", "0.0.0.0:10000", "--auth", "none"]
