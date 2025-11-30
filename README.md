# NestJS Google OAuth Project

[![Build Status](https://github.com/mirzasaikatahmmed/nestjs-google-oauth/actions/workflows/ci-publish.yml/badge.svg)](https://github.com/mirzasaikatahmmed/nestjs-google-oauth/actions)

This is a **Turborepo** workspace for the `nestjs-google-oauth` package. It contains the source code for the package as well as a test application to demonstrate and verify its functionality.

## 📂 Workspace Structure

- **[packages/nestjs-google-oauth](./packages/nestjs-google-oauth)**: The core NestJS library for Google OAuth 2.0.
- **[apps/test-app](./apps/test-app)**: A NestJS application used to test and demonstrate the library.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- npm

### Installation

Install dependencies for the entire workspace:

```bash
npm install
```

### Building

Build all packages and apps:

```bash
npm run build
# or
turbo run build
```

### Running the Test App

1.  Navigate to the test app directory:
    ```bash
    cd apps/test-app
    ```
2.  Configure `.env` (see `apps/test-app/.env.example` or create one based on `README`):
    ```env
    GOOGLE_CLIENT_ID=...
    GOOGLE_CLIENT_SECRET=...
    GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/redirect
    ```
3.  Start the app:
    ```bash
    npm run start
    ```

## 📦 Package Information

For detailed documentation on how to use the `nestjs-google-oauth` package in your own projects, please refer to the [Package README](./packages/nestjs-google-oauth/README.md).

## 🤝 Contributing

Contributions are welcome!

1.  Fork the repository.
2.  Create a feature branch.
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

## 👤 Author

- **Name**: Mirza Saikat Ahmmed
- **Github**: [https://github.com/mirzasaikatahmmed](https://github.com/mirzasaikatahmmed)
- **Website**: [https://saikat.com.bd](https://saikat.com.bd)
- **Email**: [contact@saikat.com.bd](mailto:contact@saikat.com.bd)

## 📄 License

This project is licensed under the MIT License.
