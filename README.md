# AgriTech Mobile - Commercial Backend & Frontend

This repository contains the core infrastructure for the AgriTech Mobile application. It is organized as a monorepo containing both the FastAPI backend and the mobile application source code.

## 🏗 Project Structure

- **/agritech_backend**: FastAPI Python application (REST API).
- **/frontend**: Expo / React Native mobile application.

## 🚀 Backend Setup (Production)

The backend is deployed on Ubuntu 24.04 and managed via Nginx and Systemd.

### 1. Environment Configuration

Create a `.env` file in the `agritech_backend` directory with the following variables:

- `SECRET_KEY`: Cryptographically secure string for JWT signing.
- `ALGORITHM`: (Default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token lifespan.

### 2. Installation

```bash
cd agritech_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
