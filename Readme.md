![image](https://github.com/user-attachments/assets/0ed9acdc-c828-454a-9a9f-145e053ce74a)# 🎬 Netflix Clone

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux" />
  <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" alt="Firebase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

<div align="center">
  <h3>A fully responsive Netflix Clone built with modern web technologies</h3>
  <p>Experience the power of React, Redux, Firebase, and TMDB API in this feature-rich streaming platform replica</p>
</div>

<div align="center">
  <a href="https://netflix-babar.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-FF0000?style=for-the-badge&logoColor=white" alt="Live Demo" />
  </a>
  <a href="#installation">
    <img src="https://img.shields.io/badge/📦_Installation-4CAF50?style=for-the-badge&logoColor=white" alt="Installation" />
  </a>
  <a href="#features">
    <img src="https://img.shields.io/badge/✨_Features-2196F3?style=for-the-badge&logoColor=white" alt="Features" />
  </a>
</div>

---

## 🎯 Overview

This Netflix Clone is a modern, responsive web application that replicates the core functionality of Netflix. Built with cutting-edge technologies, it provides users with an immersive movie browsing experience, complete with authentication, personalized watchlists, and real-time data from The Movie Database (TMDB).

## ✨ Features

### 🔐 Authentication
- **Secure Sign Up/Login** - Firebase Authentication with email/password
- **Protected Routes** - Secure access to personalized content
- **Session Management** - Persistent login state across sessions

### 🎥 Movie Experience
- **Trending Movies** - Real-time data from TMDB API
- **Movie Details** - Comprehensive information including cast, ratings, and descriptions
- **Trailer Integration** - Watch movie trailers directly in the app
- **High-Quality Posters** - Crisp movie imagery and thumbnails

### ❤️ Personal Features
- **My List** - Add/remove movies from your watchlist
- **Redux State Management** - Seamless state persistence
- **Responsive Design** - Perfect experience across all devices

### 🎨 User Interface
- **Netflix-Inspired Design** - Authentic Netflix look and feel
- **Smooth Animations** - Engaging user interactions
- **Mobile-First** - Optimized for mobile devices
- **Dark Theme** - Easy on the eyes viewing experience

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React.js** | Frontend Framework | ^18.0.0 |
| **Redux Toolkit** | State Management | ^1.9.0 |
| **Firebase** | Authentication & Backend | ^9.0.0 |
| **Tailwind CSS** | Styling & Design | ^3.0.0 |
| **TMDB API** | Movie Data | v3 |
| **Vercel** | Deployment & Hosting | Latest |

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/BabarAli08/Netflix--Clone.git
cd netflix-clone
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# TMDB API Configuration
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
```

## 🔧 Configuration

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication with Email/Password

2. **Get Firebase Config**
   ```javascript
   // src/firebase/config.js
   import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.REACT_APP_FIREBASE_APP_ID,
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   ```

### TMDB API Setup

1. **Get API Key**
   - Visit [TMDB](https://www.themoviedb.org/)
   - Create an account and request an API key
   - Add the key to your `.env` file

2. **API Configuration**
   ```javascript
   // src/api/tmdb.js
   import axios from "axios";

   const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;
   const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

   export const tmdbApi = axios.create({
     baseURL: BASE_URL,
     params: {
       api_key: API_KEY,
     },
   });
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm start
# or
yarn start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
# or
yarn build
```

### Testing
```bash
npm test
# or
yarn test
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Environment Variables on Vercel**
   - Add all your `.env` variables in Vercel dashboard
   - Redeploy if needed

## 📸 Screenshots

<div align="center">
  <img src="![image](https://github.com/user-attachments/assets/e6b9ef49-77a8-472a-bba7-15cced890de4)
"
  <img src="![image](https://github.com/user-attachments/assets/ff3e41a8-d690-41f1-8f37-ea42d8eabe3d)
"
  <img src="![image](https://github.com/user-attachments/assets/8383b48b-e767-4ca7-ac08-39f2228c58f7)
" alt="Netflix Clone Screenshot" />
  <p><em>Netflix Clone - Home Page</em></p>
</div>

## 🏗️ Project Structure

```
netflix-clone/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Movies/
│   │   ├── Navigation/
│   │   └── UI/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Login/
│   │   └── Profile/
│   ├── store/
│   │   ├── slices/
│   │   └── store.js
│   ├── services/
│   │   ├── firebase.js
│   │   └── tmdb.js
│   ├── utils/
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 🗺️ Roadmap

- [ ] 🔍 **Search Functionality** - Search movies by title, genre, or actor
- [ ] 🎭 **Genre Filtering** - Filter movies by categories
- [ ] 👤 **User Profiles** - Multiple user profiles with avatars
- [ ] 📱 **PWA Support** - Progressive Web App capabilities
- [ ] 🌐 **Multi-language Support** - Internationalization
- [ ] 🎬 **Video Streaming** - Basic video player integration
- [ ] 💳 **Payment Integration** - Subscription management
- [ ] 📊 **Analytics** - User behavior tracking

## 🐛 Known Issues

- Mobile responsiveness needs improvement on very small screens
- Loading states could be more polished
- Error handling needs enhancement

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Netflix** - For the inspiration and design reference
- **TMDB** - For providing the comprehensive movie database API
- **Firebase** - For authentication and backend services
- **React Team** - For the amazing JavaScript library
- **Tailwind CSS** - For the utility-first CSS framework

## 👨‍💻 Author

**Babar Ali**

- 💼 **LinkedIn**: https://www.linkedin.com/in/babar-ali-dev/
- 🐙 **GitHub**: https://github.com/BabarAli08
- 📧 **Email**: babaralidev08@gmail.com

---

<div align="center">
  <p>Made with ❤️ and lots of ☕</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>

## 📞 Support

If you have any questions or need help with the project, feel free to:

- 🐛 **Report bugs** - [Create an issue](https://github.com/BabarAli08/netflix-clone/issues)
- 💡 **Request features** - [Create a feature request](https://github.com/BabarAli08/netflix-clone/issues)
- 💬 **Ask questions** - [Start a discussion](https://github.com/BabarAli08/netflix-clone/discussions)

---

<div align="center">
  <sub>Built with modern web technologies • Deployed on Vercel • Powered by TMDB API</sub>
</div>
