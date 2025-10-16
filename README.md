# Readmify (in Progress)

A modern web application for automatically generating professional README files from GitHub repositories. Built with Next.js, TypeScript, and powered by AI to analyze your codebase and create comprehensive documentation.

## 🚀 Project Status

**Development Stage**: In Active Development

This project is currently under development. Core authentication and repository fetching functionality is implemented, with README generation features coming soon.

## ✨ Features

### Current Features
- 🔐 **Secure Authentication**: GitHub OAuth integration using Better Auth
- 📦 **Repository Management**: Fetch and display all user repositories (public and private)
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS and Radix UI components
- 📱 **Mobile-First**: Responsive design that works on all devices

### Planned Features
- 🤖 **AI-Powered README Generation**: Analyze repository code and generate comprehensive READMEs
- 📊 **Repository Analytics**: Code language detection and project insights
- 📝 **Multiple Templates**: Choose from various README templates and styles
- 🔄 **Auto-Updates**: Keep READMEs synchronized with repository changes
- 📋 **Export Options**: Download READMEs in multiple formats (Markdown, PDF)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: React 19 with Radix UI components
- **Styling**: Tailwind CSS v4
- **Authentication**: Better Auth with GitHub OAuth
- **Database**: PostgreSQL with Prisma ORM
- **API Integration**: GitHub REST API (@octokit/rest)
- **Animation**: Framer Motion
- **Code Quality**: Biome (linting & formatting)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js 18+ (LTS recommended)
- pnpm package manager
- PostgreSQL database
- GitHub OAuth App (for authentication)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd readmify
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/readmify"

   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret

   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm prisma generate

   # Run database migrations
   pnpm prisma db push
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`.

## 📖 Usage

1. **Sign In**: Authenticate with your GitHub account
2. **View Repositories**: Browse your GitHub repositories on the generate page
3. **Select Repository**: Choose a repository for README generation (coming soon)
4. **Generate README**: AI will analyze your code and create a professional README (coming soon)

## 🧪 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome

### Code Quality

This project uses Biome for fast linting and formatting. The configuration is in `biome.json`.

### Database Schema

The application uses Prisma with PostgreSQL. The schema includes:
- User management and authentication
- Session handling
- OAuth account linking
- Email verification

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines (coming soon) for details on:

- Reporting bugs
- Suggesting features
- Submitting pull requests
- Code standards

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Better Auth](https://www.better-auth.com/) for authentication
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Prisma](https://www.prisma.io/) for database ORM
- [Next.js](https://nextjs.org/) for the React framework

---

**Made with ❤️ for developers who want professional documentation without the hassle.**