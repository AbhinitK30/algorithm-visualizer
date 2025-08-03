# Algorithm Visualizer

An interactive 3D algorithm visualization platform with quizzes, leaderboards, and stunning graphics.

## 🚀 Features

- **3D Algorithm Visualizations** - Watch sorting algorithms in stunning 3D graphics
- **Interactive Quizzes** - Test your knowledge with algorithm quizzes
- **Leaderboard System** - Compete with other users
- **Modern UI/UX** - Beautiful, responsive design
- **Real-time Animations** - Smooth 3D animations and transitions

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Three.js** for 3D graphics
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
cp env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment

### Backend (Render)
1. Connect your GitHub repo to Render
2. Set environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
3. Deploy!

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set environment variable:
   - `VITE_API_URL` = Your Render backend URL
3. Deploy!

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend.onrender.com
```

## 🎯 Usage

1. **Register/Login** - Create an account to save progress
2. **Explore Visualizations** - Watch algorithms in 3D
3. **Take Quizzes** - Test your knowledge
4. **Check Leaderboard** - See how you rank

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Three.js for 3D graphics
- Tailwind CSS for styling
- MongoDB Atlas for database hosting 