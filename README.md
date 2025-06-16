# 🩺 AI Buddy - Intelligent Health Companion

> An AI-powered health companion that provides symptom checking, medical insights, and personalized health guidance with cutting-edge technology.

![AI Health](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Deployment](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify)

**Created by [Priyanshu Chawda](https://priyanshutech.xyz)**

## 🚀 Live Demo & Repository
🌐 **Live Application**: [Deployed on Netlify](https://ai-buddy-health.netlify.app)
📱 **GitHub Repository**: [https://github.com/priyanshuchawda/buddy.git](https://github.com/priyanshuchawda/buddy.git)

## ✨ Features

### 🧠 **AI-Powered Health Assistant**
- **Symptom Checker** - Intelligent symptom analysis and recommendations
- **Medical Scanner Effect** - Advanced UI with medical-grade visualization
- **Health Reports** - Comprehensive health assessments and insights
- **Profile Completion** - Personalized health profile management
- **Interactive Maps** - Location-based healthcare services

### 🔬 **Advanced Medical Technology**
- **Real-time Analysis** - Instant symptom evaluation
- **Smart Recommendations** - AI-driven health suggestions
- **Progress Tracking** - Health metrics and improvement monitoring
- **Secure Data** - HIPAA-compliant data handling with Supabase
- **Multi-device Support** - Accessible across all platforms

### 🎨 **Modern Medical Interface**
- **Medical Scanner UI** - Professional medical equipment aesthetics
- **Animated Backgrounds** - Dynamic grid patterns and effects
- **Responsive Design** - Optimized for medical professionals and patients
- **Dark Theme** - Easy on the eyes for extended use
- **Accessibility** - Designed for users with various abilities

## 🛠️ Tech Stack
- **Frontend**: React 18 + TypeScript
- **Backend**: Supabase (Database, Auth, Real-time)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/ui Components
- **Icons**: Lucide React (Medical Icons)
- **Maps**: Interactive location services
- **Deployment**: Netlify (Auto-deploy from GitHub)
- **Version Control**: Git + GitHub

## 🏗️ Installation & Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- Supabase account (for backend services)

### Local Development
```bash
# Clone the repository
git clone https://github.com/priyanshuchawda/buddy.git
cd ai-buddy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase credentials

# Start development server
npm run dev

# Open http://localhost:8080 in your browser
```

### Environment Variables
Create a `.env.local` file with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Deployment Guide

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Backend**: Supabase
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/ui Components
- **Deployment**: Netlify (Auto-deploy from GitHub)

### Automatic Deployment via Netlify

This project is configured for automatic deployment to Netlify via GitHub integration:

1. **GitHub Repository**: [https://github.com/priyanshuchawda/buddy.git](https://github.com/priyanshuchawda/buddy.git)
2. **Auto-deploy**: Every push to the `main` branch triggers automatic deployment
3. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

### Environment Variables Setup (Netlify)

In your Netlify dashboard, add these environment variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Manual Netlify Deployment

If you want to deploy manually:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository for automatic deployments

### Environment Configuration

The project includes a `netlify.toml` file with:
- Build settings and Node.js version
- Redirect rules for SPA routing
- Environment variables configuration

### Other Deployment Options

**Vercel**:
```bash
npm install -g vercel
vercel --prod
```

**GitHub Pages**:
```bash
npm run build
# Deploy the dist folder to gh-pages branch
```

## 🩺 Application Features

### Health Monitoring
- **Symptom Assessment**: Comprehensive symptom checking with AI analysis
- **Health Reports**: Detailed health insights and recommendations
- **Progress Tracking**: Monitor health improvements over time
- **Medical History**: Secure storage of health records

### User Experience
- **Intuitive Interface**: Medical-grade UI design
- **Real-time Feedback**: Instant health assessments
- **Personalized Insights**: Tailored health recommendations
- **Mobile Responsive**: Works seamlessly on all devices

### Security & Privacy
- **Data Encryption**: End-to-end encrypted health data
- **HIPAA Compliance**: Medical-grade security standards
- **Secure Authentication**: Supabase-powered user management
- **Privacy First**: User data protection and consent management

## 🔧 Supabase Integration

### Database Schema
- **Users Table**: User profiles and preferences
- **Health Records**: Symptom data and assessments
- **Reports Table**: Generated health reports
- **Sessions Table**: User interaction tracking

### Real-time Features
- **Live Updates**: Real-time health data synchronization
- **Instant Notifications**: Health alerts and reminders
- **Collaborative Care**: Healthcare provider integration

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile health monitoring
- **Tablet Support**: Perfect for clinical use
- **Desktop Interface**: Comprehensive health dashboard
- **Cross-Platform**: Consistent experience across devices

## 🧪 Testing & Quality

- **TypeScript**: Type safety for medical data
- **ESLint**: Code quality and medical data standards
- **Health Data Validation**: Strict input validation
- **Security Testing**: Regular security audits

## 🎯 Use Cases

- **Personal Health Monitoring**
- **Symptom Self-Assessment**
- **Healthcare Provider Tools**
- **Telemedicine Support**
- **Health Education Platform**
- **Medical Research Data Collection**

## 🤖 AI Capabilities

- **Natural Language Processing**: Understand health queries
- **Pattern Recognition**: Identify health trends
- **Predictive Analytics**: Health risk assessment
- **Machine Learning**: Improving recommendations over time

---

Built with ❤️ by [Priyanshu Chawda](https://priyanshutech.xyz) | Your intelligent health companion, powered by AI!