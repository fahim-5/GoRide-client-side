# 🚗 TravelEase - Vehicle Booking & Trip Management Platform

A full-stack MERN application for seamless vehicle rentals and trip management. Connect with vehicle owners and travelers in one platform.

**Live Website:** [https://goride-by-fahim.vercel.app](https://goride-by-fahim.vercel.app)  
**Backend API:** [https://goride-by-fahim-api.vercel.app](https://goride-by-fahim-api.vercel.app)

## ✨ Key Features

- **🔐 Secure Authentication** - Firebase-powered login system with Google OAuth and email/password authentication
- **🚗 Vehicle Management** - Add, update, and manage your vehicles with detailed listings and availability tracking
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS for seamless experience across all devices
- **🔍 Smart Filtering** - Advanced search and filter options by category, location, price range, and availability
- **📅 Booking System** - Easy vehicle booking with date selection, pricing calculation, and booking history

## 🛠️ Tech Stack

### Frontend
- **React** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Firebase Auth** - Authentication service
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **Firebase Admin** - Backend authentication
- **Joi** - Data validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Firebase project

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/goride.git
cd goride
```

2. **Frontend Setup**
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

3. **Backend Setup**
```bash
cd server
npm install
cp .env.example .env
npm start
```

## 📁 Project Structure

```
goride/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   └── services/       # API services
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   └── middleware/         # Custom middleware
```

## 🌟 Additional Features

- **Dark/Light Theme** - Toggle between themes for better user experience
- **Real-time Updates** - Instant availability status changes
- **Image Upload** - Vehicle cover images via imgBB integration
- **Toast Notifications** - User-friendly feedback messages
- **Loading States** - Smooth loading indicators throughout the app

## 📞 Support

For support and questions, please contact:
- **Email:** support@goride.com
- **GitHub Issues:** [Create an issue](https://github.com/fahim-5/GoRide-client-side/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**GoRide** - Your trusted partner for vehicle rentals and trip management. Find the perfect ride for your journey! 🚀