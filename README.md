# E-commerce Application Deployment Guide

This project has been restructured for deployment with separate frontend and backend repositories.

## Project Structure

```
├── client/           # React frontend (Vite + TailwindCSS)
│   ├── src/          # React source code
│   ├── .env          # Environment variables for frontend
│   ├── vite.config.js
│   ├── vercel.json   # Vercel deployment configuration
│   └── ...
│
├── server/           # Express backend 
│   ├── app.js        # Main server file
│   ├── .env          # Environment variables for backend
│   ├── render.yaml   # Render deployment configuration
│   └── ...
```

## Deployment Instructions

### Frontend (Vercel)

1. Push your code to a GitHub repository
2. Log in to [Vercel](https://vercel.com)
3. Create a new project and import the GitHub repository
4. Configure the project:
   - Root Directory: `client`
   - Framework Preset: Vite
5. Add the environment variables:
   - `VITE_API_BASE_URL`: URL of your backend API (e.g., https://your-backend.onrender.com/api)
6. Deploy

### Backend (Render)

1. Push your code to a GitHub repository
2. Log in to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Configure the service:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables:
   - `PORT`: 10000 (Render automatically assigns a PORT)
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production
7. Deploy

## Important Notes

1. After deploying your backend, update the `VITE_API_BASE_URL` in your frontend's environment variables with the actual Render URL.
2. Make sure CORS is properly configured in your backend to accept requests from your Vercel domain.
3. For local development, you can create `.env.local` files in both client and server directories with development values.
