# Shortener Website

A modern URL shortening application built with Next.js 15, React, and Redux. This application allows users to create, manage, and track shortened URLs with a clean, responsive interface.

**Live Demo:** https://shortener-goni.vercel.app

## 🚀 Features

- **User Authentication** - Sign up, login, and email verification with OTP
- **URL Shortening** - Create custom or auto-generated short URLs
- **Dashboard** - Manage all shortened URLs with analytics
- **Dynamic Redirects** - Automatic redirection from short codes to original URLs
- **URL Management** - View, update, and delete shortened URLs
- **Responsive Design** - Mobile-friendly interface with adaptive layouts
- **Private Routes** - Protected dashboard accessible only to authenticated users

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **State Management:** Redux with Redux Toolkit (RTK)
- **API Management:** RTK Query
- **Form Handling:** React Hook Form
- **UI Components:** Ant Design (antd)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Icons Alternative:** React Icons

### Backend
- **API Base URL:** https://shortener-backend-goni.vercel.app/api/v1

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                    # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-account-otp/
│   │   └── layout.tsx             # Auth layout wrapper
│   ├── (MainLayout)/              # Main application routes
│   │   ├── dashboard/
│   │   ├── layout.tsx             # Main layout wrapper
│   │   └── page.tsx               # Homepage
│   ├── [code]/                    # Dynamic redirect route
│   ├── globals.css                # Global styles
│   └── layout.tsx                 # Root layout
├── components/
│   ├── auth/                      # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── VerifyAccountOtpForm.tsx
│   ├── dashboard/                 # Dashboard components
│   │   ├── UrlList.tsx
│   │   ├── UrlListHeader.tsx
│   │   └── UrlTable.tsx
│   ├── form/                      # Reusable form components
│   │   ├── CustomInput.tsx
│   │   ├── DeleteButton.tsx
│   │   └── SubmitButton.tsx
│   ├── home/                      # Homepage components
│   │   └── CreateUrlForm.tsx
│   ├── layout/                    # Layout components
│   │   ├── MobileMenu.tsx
│   │   └── Navbar.tsx
│   ├── loader/                    # Loading states
│   │   ├── PrivateLoading.tsx
│   │   ├── PublicLoading.tsx
│   │   └── TableLoading.tsx
│   ├── modal/                     # Modal components
│   │   ├── DeleteUrlModal.tsx
│   │   └── ViewUrlModal.tsx
│   ├── PrivateRoute/              # Protected route wrapper
│   ├── PublicRoute/               # Public route wrapper
│   └── validation/                # Validation components
│       ├── FormError.tsx
│       ├── PasswordStrength.tsx
│       └── Success.tsx
├── constant/
│   ├── global.constant.ts
│   └── tagTypes.constant.ts
├── helpers/
│   ├── SessionHelper.ts           # LocalStorage management
│   └── ValidationHelper.ts        # Toast notifications
├── hooks/
│   ├── useMobile.tsx
│   └── useUserInfo.tsx
├── providers/
│   └── GlobalProvider.tsx         # Redux provider
├── redux/
│   ├── features/
│   │   ├── api/
│   │   │   └── apiSlice.ts        # Base API configuration
│   │   ├── auth/
│   │   │   ├── authApi.ts
│   │   │   └── authSlice.ts
│   │   └── url/
│   │       ├── urlApi.ts
│   │       └── urlSlice.ts
│   ├── hooks/
│   │   └── hooks.ts               # Redux hooks (useDispatch, useSelector)
│   └── store/
│       └── store.ts
├── schema/
│   └── auth.schema.ts             # Zod validation schemas
├── types/
│   ├── global.type.ts
│   └── url.type.ts
└── utils/
    └── getColorClassForDate.ts
```

global.constant.ts file 

```env
export const BASE_URL=https://shortener-backend-goni.vercel.app/api/v1
export const DOMAIN_URL=https://shortener-goni.vercel.app
```

## 📦 Installation

### Prerequisites
- Node.js 24+ or higher
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/goni715/shortner-website
   cd shortner-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## 🏃 Running the Project

### Development Mode
```bash
yarn run dev
```

### Production Build
```bash
yarn run build
yarn run start
```

### Linting
```bash
npm run lint
```

## 🔐 Authentication Flow

1. **Register** - Create new account with email and password
2. **Verify Email** - Confirm account with OTP sent to email
3. **Login** - Authenticate with email and password
4. **Token Management** - JWT token stored in localStorage via SessionHelper
5. **Private Routes** - Protected pages redirect to login if not authenticated

## 📊 Key Components

### SessionHelper
Manages authentication tokens and user session data via localStorage:
- `setToken()` - Store JWT token
- `getToken()` - Retrieve JWT token
- `isLoggedIn()` - Check authentication status
- `getUserInfo()` - Decode and return user data
- `logout()` - Clear session and redirect to home

### ValidationHelper
Handles user notifications:
- `SuccessToast()` - Show success messages
- `ErrorToast()` - Show error messages
- `WarningToast()` - Show warning messages with custom styling

### CustomInput
Reusable form input component with:
- Password visibility toggle
- Real-time validation
- Error message display
- Disabled state support

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Ant Design** - Component library for modals and UI elements
- **Responsive Design** - Mobile-first approach with breakpoints (sm, md, lg)
- **Dark Mode Ready** - CSS variables for theme customization

## 🔄 State Management

### Redux Architecture
- **RTK Query** - API calls and caching
- **Redux Slices** - Authentication and URL state
- **Selectors** - Global state access
- **Hooks** - Custom Redux hooks for components

### API Integration
- Base API configuration in `apiSlice.ts`
- Separate API files for auth and URLs
- Tag-based cache invalidation
- Automatic request/response handling

## 🚀 Deployment

The project is deployed on **Vercel**:

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |


**Developed with ❤️ by the Osman Goni**

