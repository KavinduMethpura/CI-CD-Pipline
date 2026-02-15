# CI/CD Pipeline Guide

## 1. Core Concepts

### What is CI/CD?

- **CI (Continuous Integration)**: Automatically test & build code whenever you push changes.
- **CD (Continuous Delivery/Deployment)**: Automatically deploy tested code to staging/production.

## 2. Basic CI Pipeline

**Tool**: GitHub Actions

**Goal**: When you push code, install dependencies, run tests, and build the project.

```yaml
name: CI Pipeline

on:
    push:
        branches:
            - main

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - name: Install Node
                uses: actions/setup-node@v3
                with:
                    node-version: 18
            - run: npm install
            - run: npm test
            - run: npm run build
```

## 3. Docker Integration

### Dockerfile

A text file containing instructions to build a Docker image (like a recipe for your application environment).

### Docker Image

A packaged blueprint containing OS, runtime, libraries, app code, and startup command.

### Docker Container

A running instance of an image.

### Docker Hub

A cloud registry to store and share Docker images (GitHub for container images).

### CI/CD Workflow with Docker

```yaml
- name: Build Docker image
    run: docker build -t username/app:latest .

- name: Login to Docker Hub
    run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u username --password-stdin

- name: Push image
    run: docker push username/app:latest
```

## 4. Deployment Automation

### Option A: SSH Deployment

```yaml
- name: Deploy to server
    uses: appleboy/ssh-action@master
    with:
        host: ${{ secrets.SERVER_HOST }}
        username: ubuntu
        key: ${{ secrets.SERVER_SSH_KEY }}
        script: |
            docker pull username/app:latest
            docker stop app || true
            docker rm app || true
            docker run -d -p 80:3000 username/app:latest
```

### Option B: Docker Compose Deployment

Better structure for multi-service deployments.

## 5. Advanced Concepts

- **Branching Strategies**: GitFlow, feature branches, PR validation
- **Multi-Environment Deployment**: Dev, staging, production
- **Secrets Management**: GitHub Secrets, environment variables
- **Rollback Strategies**: Blue/Green, Canary deployments

## 6. Enterprise Tools

- **Jenkins**: Install on VM, create Jenkinsfile pipelines
- **GitLab CI**: Native CI/CD in GitLab
- **Kubernetes**: Helm, rolling updates, self-healing

## 7. Real-World Architecture

Developer Push → CI (Test/Build/Lint) → Docker Image → Registry → Staging → Approval → Production → Monitoring
