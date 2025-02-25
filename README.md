# Expense Tracker

<!-- A web-based application that helps users efficiently track their income and expenses, providing insights, categorized spending analysis, and transaction tracking with a modern and intuitive interface. -->
## **Expense Tracker MUN – Smart Financial Management Made Simple**

**Expense Tracker MUN** is a **web-based application** designed to help users efficiently manage their finances by tracking income, expenses, and spending habits in a structured and intuitive way. Whether it's daily expenses, monthly bills, or long-term savings, this tool provides **real-time insights, categorized spending analysis, and seamless transaction tracking** to ensure users stay financially aware and in control.

With features like **automated transaction logging, smart budgeting tools, and goal-based financial planning**, **Expense Tracker MUN** makes managing money effortless. Users can visualize their spending trends, set savings goals, and track their progress without the hassle of manual calculations. The platform is built with a user-friendly interface, ensuring a smooth experience while prioritizing data privacy and security. Whether you're an individual looking to improve your personal finance habits or someone managing shared expenses, **Expense Tracker MUN** simplifies the process, helping you **spend smarter, save better, and plan for the future with confidence**.

## 📸 Screenshots

### Login Page
<p align="center">
  <img src="./public/screenshots/Expense-Tracker-MUN-login.png" alt="Login Page" width="80%"/>
</p>

### Dashboard View (Dark & Light Mode)
<p align="center">
  <img src="./public/screenshots/Expense-Tracker-MUN-light.png" alt="Light Mode Dashboard" width="45%"/>
  <img src="./public/screenshots/Expense-Tracker-MUN-dark.png" alt="Dark Mode Dashboard" width="45%"/>
</p>

### Transactions View (Dark & Light Mode)
<p align="center">
  <img src="./public/screenshots/Expense-Tracker-MUN-transactions-light.png" alt="Light Mode Transactions" width="45%"/>
  <img src="./public/screenshots/Expense-Tracker-MUN-transactions-dark.png" alt="Dark Mode Transactions" width="45%"/>
</p>

## 🚀 Features

### ✅ Completed
[✅] User authentication via GitHub & Google\
[✅] Dashboard with financial insights\
[✅] Categorized expense tracking\
[✅] Monthly transaction trends\
[✅] Responsive UI with Shadcn components

### ⏳ To Be Completed
[⏳] Historical Transactions with Filtering\
[⏳] Recurring Expense Reminders\
[⏳] Budgeting Tips & Alerts\
[⏳] Budgeting and notifications for budgeting\
[⏳] Advanced Financial Goal Setting\
[⏳] Multi-user Collaboration\
[⏳] Detailed Financial Reports\

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (TypeScript, App Router), TailwindCSS, Shadcn
- **Backend**: Fastify
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth.js (NextAuth)
- **Deployment**: Vercel (Auto-deploys enabled)
- **Security/Monitoring**: Arcjet

## 📋 Prerequisites

- **Node.js & PNPM** installed
- **PostgreSQL** database set up

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/idarshan181/ExpenseTracker-MUN.git
cd ExpenseTracker-MUN
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Generate Prisma client

```bash
pnpm dlx prisma generate
```

### 4. Run the development server

```bash
pnpm run dev
```

## 📁 Project Structure

```
├── prisma
│   └── schema.prisma
├── public/
│   ├── logos/
│   ├── screenshots/
├── src/
│   ├── app/
│   │   ├── (mainLayout)/
│   │   │   ├── budgets/
│   │   │   ├── dashboard/
│   │   │   ├── reports/
│   │   │   ├── transactions/
│   │   ├── actions.ts
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── arcjet/
│   │   │   ├── uploadthing/
│   │   ├── data/
│   │   ├── login/
│   │   ├── onboarding/
│   │   ├── utils/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Sidebar/
│   │   ├── Transactions/
│   │   ├── forms/
│   │   ├── general/
│   │   ├── ui/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── commitlint.config.ts
├── components.json
├── eslint.config.mjs
├── lint-staged.config.js
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
└── tsconfig.json

```

## 📝 Environment Variables (.env)

Create a `.env` file in the root directory and include the following variables:

```env
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
AUTH_GITHUB_CALLBACK_URL=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GOOGLE_CALLBACK_URL=
DATABASE_URL=
UPLOADTHING_TOKEN=
ARCJET_KEY=
```

## 🚀 Deployment
The project is automatically deployed using **Vercel**. No CI/CD pipeline is currently configured.

## 🏃‍♂️ Running in Production

```bash
pnpm run build
pnpm start
```

## 🤝 Contribution Guidelines

### 🚀 How to Contribute

1. **Fork the repository.**
2. **Create a new branch** following the commit convention structure:

```sh
git checkout -b <type>/<scope>
```

### **Examples:**
```sh
git checkout -b feat/dashboard
git checkout -b feat/analytics
git checkout -b fix/hydration
```

3. **Make your changes and commit using the proper commit message format.**
4. **Push to your branch:**
```sh
git push origin <type>/<scope>
```
5. **Submit a pull request for review.**

🚨 **Note:** Only the repository owner can merge due to Vercel's hobby limitations.\
💡 Always create a **new branch for each feature or fix** before submitting a pull request.

---

### Commit Message Format

Please follow the commit message convention as enforced by **Husky** and **Commitlint** based on **Conventional Commits**:

```
git commit -m "<type>(<scope>): <subject>"
```

### **type** (Choose from the following):

- **build**: Changes that affect the build system or external dependencies
- **chore**: General maintenance tasks
- **ci**: Changes to CI/CD configuration
- **docs**: Documentation updates
- **feat**: New features
- **fix**: Bug fixes
- **perf**: Performance improvements
- **refactor**: Code changes that neither fix a bug nor add a feature
- **revert**: Reverting previous commits
- **style**: Code style changes (formatting, missing semi-colons, etc.)
- **test**: Adding or updating tests

### **scope** (Optional)
A specific area of the codebase affected (e.g., `auth`, `dashboard`).

### **subject**
A short, descriptive message (**in lowercase, no period at the end**).

#### **Example:**
```sh
git commit -m "feat(auth): add Google OAuth support"
git commit -m "fix(dashboard): resolve incorrect expense calculation"
git commit -m "docs(readme): update contribution guidelines"
```

Please follow the commit message convention as enforced by Husky and Commitlint:

```
git commit -m "feat/fix/chore/subject: message"
```

- **feat**: For new features
- **fix**: For bug fixes
- **chore**: For maintenance or minor tasks
- **subject**: A short description of the changes
- **message**: A brief explanation of the commit

---

## 📄 License

This project is for **educational purposes only** and does not include a formal license.

---

For any questions or contributions, feel free to open an issue or submit a PR!
