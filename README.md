# HomAlert 🔔🏠

*Smart‑Home Emergency Notification System*

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![CI](https://github.com/ChrysKoum/HomAlert/actions/workflows/ci.yml/badge.svg)](https://github.com/ChrysKoum/HomAlert/actions)
[![Coverage](https://coveralls.io/repos/github/ChrysKoum/HomAlert/badge.svg?branch=main)](https://coveralls.io/github/ChrysKoum/HomAlert?branch=main)
[![Open Issues](https://img.shields.io/github/issues/ChrysKoum/HomAlert)](https://github.com/ChrysKoum/HomAlert/issues)

---

HomAlert turns inexpensive **ESP32 sensors** + **Firebase** + **Node.js** into a real‑time early‑warning platform for households. It detects fires, floods, gas leaks, and intrusions; then pushes instant alerts to a web dashboard, email, and (coming soon) mobile push.

> **Why another smart‑home project?** Because most solutions are closed‑source, require expensive hubs, or lock you into vendor clouds. HomAlert is 100 % MIT‑licensed and self‑host‑friendly.

---

## 📖 Quick Links

|                       | Link                                         |
| --------------------- | -------------------------------------------- |
| 🏃 **Get Started**    | [Installation](#installation)                |
| 👩‍💻 **Contribute**  | [Contributing Guide](CONTRIBUTING.md)        |
| 🚀 **Roadmap**        | [ROADMAP.md](ROADMAP.md)                     |
| 📝 **Docs**           | [docs/](docs/) *(WIP)*                       |
| 💬 **Community Chat** | [Discord Invite](https://discord.gg/XXXXXXX) |

---

## ✨ Key Features

* **Multi‑hazard detection** — fire, flood, gas, intrusion (extensible via plugins)
* **Real‑time dashboard** — live sensor feed on web (React/Tailwind UI)
* **Instant notifications** — email & optional SMS/Push
* **User management** — sign‑up/login, email verification, role‑based access
* **ESP32 firmware template** — plug‑and‑play over Wi‑Fi/BLE
* **Pluggable data store** — default Firebase Realtime DB; swap in Firestore or SQL
* **MIT‑licensed** — free for commercial & personal use

---

## 🖼️ Project Architecture (High‑Level)

```
┌────────────┐    Wi‑Fi/MQTT   ┌───────────────────┐  Reads/Writes   ┌──────────────┐
│  Sensors   │ ──────────────▶│       ESP32        │ ──────────────▶│   Firebase   │
│ (Multiple) │                 │ (Microcontroller) │                 │   Services   │
└────────────┘                 └───────────────────┘                 └──────────────┘
                                                                           │
                                                                           │ Firebase Admin SDK
                                                                           ▼
                          ┌─────────┐        REST/WebSocket         ┌──────────────┐            
                          │ Client  │ ◀─────────────────────────▶  │ Node.js API  │ 
                          │ (React) │                               │  (Express)   │                            
                          └─────────┘                               └──────────────┘                           

```

*(See `docs/architecture.md` for details and sequence diagrams.)*

---

## 🚀 Installation

### Prerequisites

| Tool                    | Version |
| ----------------------- | ------- |
| Node.js                 | >= 16   |
| npm or pnpm             | latest  |
| Git                     | ^2.30   |
| (Optional) Firebase CLI | ^12     |

### 1. Clone & Install

```bash
# Fork first if you plan to contribute
$ git clone https://github.com/ChrysKoum/HomAlert.git
$ cd HomAlert
$ npm ci            # or pnpm install
```

### 2. Configure Firebase

1. Create a new **Firebase > Web** project.
2. Enable **Email/Password Auth**.
3. Create a **Realtime Database** (or Firestore, adjust `.env`).
4. Copy config and paste into `.env` (see `.env.example`).

```bash
$ cp .env.example .env
$ nano .env  # or your editor of choice
```

### 3. Run Locally

```bash
$ npm run dev      # nodemon + vite + tailwind (port 3005 by default)
```

Visit **[http://localhost:3005](http://localhost:3005)** and sign up with email verification.

---

## 🧪 Testing

```bash
# Run unit + integration tests (Jest)
$ npm test
```

Coverage reports are generated in `coverage/` and uploaded to Coveralls in CI.

---

## 🗂️ Project Structure (short version)

```text
client/            # React front‑end (Vite + Tailwind)
controllers/       # Express route handlers
routes/            # Route definitions
middleware/        # Auth, logging, error handling
Firebase/          # Firebase config & helpers
views/             # EJS server‑rendered pages
utils/             # Shared helpers (formatting, validation…)
```

*(Full tree → `docs/project-structure.md`)*

---

## 🤝 Contributing

We love contributors! Please read **[CONTRIBUTING.md](CONTRIBUTING.md)** and our **[Code of Conduct](CODE_OF_CONDUCT.md)** before submitting a PR. New to open source? Check out issues labeled **good first issue**.

---

## 🛣️ Roadmap

* **v1.1** – Mobile Push (Expo) · Improved test coverage · GitHub Actions CI
* **v2.0** – Plugin SDK for custom sensors · Local‑first offline cache
* **v3.0** – AI anomaly detection · Docker self‑host images

See full details in **[ROADMAP.md](ROADMAP.md)**.

---

## 📜 License

HomAlert is released under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 📞 Community & Support

* **Discussions**: [https://github.com/ChrysKoum/HomAlert/discussions](https://github.com/ChrysKoum/HomAlert/discussions)
* **Chat (Discord)**: [https://discord.gg/XXXXXXX](https://discord.gg/XXXXXXX)
* **Security contact**: [security@homalert.dev](mailto:security@homalert.dev)

Thanks for stopping by — star ⭐ the repo if you find it useful!
