# Isolated Multi-Language Execution Sandbox for CodeMaster AI
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    openjdk-21-jdk-headless \
    python3 \
    python3-pip \
    g++ \
    nodejs \
    npm \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /sandbox

# Create unprivileged runner user
RUN useradd -m -s /bin/bash runner && \
    chown -R runner:runner /sandbox

USER runner

ENTRYPOINT ["python3", "-m", "runner.main"]
