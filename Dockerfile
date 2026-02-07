FROM codercom/code-server:latest

ENV PASSWORD=${PASSWORD:-creatorsmeet2024}

EXPOSE 10000

CMD ["--bind-addr", "0.0.0.0:10000", "--auth", "password"]
