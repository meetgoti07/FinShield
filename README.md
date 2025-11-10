# FinShield AI

**Fraud Detection Platform**

[![Watch Demo](https://img.shields.io/badge/Watch_Demo-YouTube-red?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=mnxmlJTKeEk)

FinShield AI is a comprehensive, real-time fraud detection and financial transaction monitoring platform that leverages artificial intelligence to protect organizations from fraudulent activities. Built with modern web technologies, it provides intelligent alerts, advanced analytics, and seamless compliance management.

![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-6.5.0-2D3748?logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss)

## Key Features

### **Real-Time Fraud Detection**

- AI-powered transaction monitoring with millisecond response times
- Dynamic risk scoring algorithms
- Intelligent pattern recognition for fraud detection
- Automated transaction flagging and approval workflows

### **Advanced Analytics Dashboard**

- Comprehensive transaction visualization with Recharts
- Real-time fraud metrics and KPIs
- Historical data analysis and trend identification
- Customizable reporting and data exports

### **AI-Powered Assistant**

- RAG (Retrieval-Augmented Generation) chatbot using Google Gemini AI
- Natural language queries for transaction data
- Contextual insights and fraud analysis
- Smart recommendations based on transaction patterns

### **Robust Security & Authentication**

- NextAuth.js integration with Google OAuth and credentials
- Session management and user authorization

### **Modern UI/UX**

- Responsive design with Tailwind CSS
- Dark/Light theme support
- Accessible components with Radix UI
- Smooth animations with Framer Motion

## **Tech Stack**

### **Frontend**

- **Framework**: Next.js 15.1.0 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI + shadcn/ui
- **Charts**: Recharts 2.15.0
- **Icons**: Lucide React
- **Animations**: Framer Motion 12.6.2

### **Backend**

- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM 6.5.0
- **Authentication**: NextAuth.js 4.24.11
- **AI**: Google Generative AI (Gemini 1.5 Flash)

### **Database Schema**

- **Users**: Authentication and user management
- **Transactions**: Core transaction data with fraud indicators
- **Analytics**: Aggregated fraud and transaction metrics
- **Sessions**: Secure session management

### **Development Tools**

- **Package Manager**: pnpm
- **Linting**: ESLint (build-time disabled for flexibility)
- **Type Checking**: TypeScript with build-time error handling
- **Database Migration**: Prisma Migrate

## **Getting Started**

### **Prerequisites**

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Google API key for AI features
- Git for version control

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/meetgoti07/FinShield.git
   cd FinShield
   ```

2. **Install dependencies**

   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/finshield"

   # NextAuth Configuration
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Google AI API Key
   API_KEY="your-google-ai-api-key"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   pnpm prisma generate

   # Run database migrations
   pnpm prisma migrate dev --name init

   ```

5. **Start Development Server**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

### **Production Build**

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## **Project Structure**

```
FinShield/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── transactions/         # Transaction CRUD operations
│   │   ├── analytics/            # Analytics data endpoints
│   │   ├── alerts/               # Fraud alert management
│   │   └── chatwithai/           # AI chatbot endpoint
│   ├── dashboard/                # Protected dashboard pages
│   │   ├── transactions/         # Transaction management
│   │   ├── analytics/            # Analytics dashboard
│   │   ├── alerts/               # Fraud alerts
│   │   ├── users/                # User management
│   │   └── assistant/            # AI assistant interface
│   ├── login/                    # Authentication pages
│   └── register/                 # User registration
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui components
│   ├── dashboard/                # Dashboard-specific components
│   ├── auth/                     # Authentication components
│   ├── analytics/                # Analytics visualizations
│   └── landing/                  # Landing page components
├── lib/                          # Utility libraries
│   ├── prisma.ts                 # Database client
│   └── utils.ts                  # Helper functions
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Database schema definition
│   └── migrations/               # Database migration files
├── hooks/                        # Custom React hooks
├── styles/                       # Global styles
└── public/                       # Static assets
```

## **API Endpoints**

### **Authentication**

- `POST /api/auth/[...nextauth]` - NextAuth.js authentication
- `POST /api/register` - User registration

### **Transactions**

- `GET /api/transactions` - Fetch transactions
- `POST /api/transactions` - Create new transaction
- `GET /api/recent-transaction` - Get recent transactions

### **Analytics**

- `GET /api/analytics` - Fraud analytics data
- `GET /api/overview` - Dashboard overview metrics

### **Fraud Detection**

- `GET /api/alerts` - Fraud alerts
- `GET /api/recent-fraud` - Recent fraud cases

### **AI Assistant**

- `POST /api/chatwithai` - AI-powered transaction queries

## **Key Features Explained**

### **Fraud Detection Algorithm**

The platform uses a multi-layered approach:

1. **Risk Scoring**: Real-time calculation based on transaction patterns
2. **Compliance Scoring**: Regulatory compliance assessment
3. **Severity Classification**: Automatic threat level assignment
4. **Pattern Recognition**: AI-driven anomaly detection

### **AI Assistant Capabilities**

- Natural language transaction queries
- Fraud trend analysis
- Risk assessment insights
- Compliance guidance
- Real-time data interpretation

### **Dashboard Analytics**

- Transaction volume tracking
- Fraud rate monitoring
- Risk distribution analysis
- Compliance score trends
- Geographic fraud patterns

## **Configuration**

### **Database Configuration**

The application uses PostgreSQL with Prisma ORM. Key models include:

- **User**: Authentication and profile data
- **Transaction**: Core transaction records with fraud indicators
- **Analytics**: Aggregated metrics and insights

### **AI Configuration**

Configure Google AI integration:

1. Obtain API key from Google AI Studio
2. Set `API_KEY` in environment variables
3. Customize model parameters in `/api/chatwithai/route.ts`

### **Authentication Setup**

1. Configure NextAuth.js providers
2. Set up Google OAuth (optional)
3. Configure session management
4. Implement role-based access control

## **Deployment**

### **Vercel Deployment (Recommended)**

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Environment Variables for Production**

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="production-secret-key"
NEXTAUTH_URL="https://your-domain.com"
API_KEY="your-google-ai-api-key"
```

### **Database Migration in Production**

```bash
pnpm prisma migrate deploy
```

## **Development**

### **Running Tests**

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### **Database Management**

```bash
# View database in Prisma Studio
pnpm prisma studio

# Reset database
pnpm prisma migrate reset

# Generate Prisma client
pnpm prisma generate
```

## **Acknowledgments**

- **Next.js Team** - For the amazing React framework
- **Vercel** - For seamless deployment platform
- **Prisma** - For the excellent database toolkit
- **shadcn/ui** - For beautiful, accessible UI components
- **Google AI** - For powerful generative AI capabilities

---
