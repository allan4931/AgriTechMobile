# AgriTech Mobile & Backend System 🚜

A professional, full-stack data collection suite designed for commercial agricultural field operations. This system features a React Native mobile client for field clerks and a high-performance FastAPI backend with multi-instance deployment and secure HTTPS.

---

## 📱 Deliverables for Task 2

### **[➔ Download Android APK (v1.0.0)](https://expo.dev/artifacts/eas/s7NiiBwnezP6DuUGHzGZKd.apk)**

_Click the link above to download and install the application directly on your Android device._

---

## 🚀 System Architecture & Deployment

The system is deployed on a hardened Ubuntu Server environment with the following professional configurations:

### **Backend Infrastructure**

- **Live Domain:** `https://allan.zivo.cloud`
- **Server Hostname:** `allan`
- **Reverse Proxy:** Nginx configured for secure request routing.
- **SSL/TLS:** End-to-end encryption via Let's Encrypt.
- **Multi-Instance:** Configured with two separate back-end instances running concurrently to demonstrate scalability and high availability.
- **Deployment Flow:** Continuous delivery via GitHub integration (no manual code copying).

### **Security Hardening**

- **SSH Security:** Remote `root` login is strictly disabled.
- **SUDO Access:** System management is handled via a dedicated `sudo` user (`allan`).
- **Key-based Auth:** Access is secured via SSH keys.

---

## ✨ Key Features

### **Mobile App (React Native/Expo)**

- **Role-Based Access:** Separate workflows for **Admin** and **Field Clerks**.
- **Real-time Data Entry:** Efficient farmer registration and data synchronization.
- **Automated Tracking:** Clerk activities are automatically logged by account.
- **Commercial UI:** Clean, brand-neutral interface optimized for field use.

### **Backend (FastAPI/SQLite)**

- **RESTful API:** Clean endpoints for token authentication and data persistence.
- **Auto-Documentation:** Interactive API documentation available at `/docs`.
- **Auditing:** Every record is linked to a specific user for accountability.

---

## 🛠 Tech Stack

- **Mobile:** React Native, Expo, AsyncStorage, Axios.
- **Backend:** Python, FastAPI, Uvicorn, SQLAlchemy.
- **Server:** Ubuntu, Nginx, Systemd, Certbot.

---

## 📝 How to Test

1. **Mobile:** Download the APK from the link above. Use your provided Clerk or Admin credentials to log in.
2. **Backend:** Visit `https://allan.zivo.cloud/docs` to interact with the API directly via the Swagger UI.
3. **Server:** Verify the secure connection by looking for the padlock icon in your browser.

---

_Created for Commercial Use Evaluation - Task 2 Deliverable_
