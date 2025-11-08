# Social Media App Server

This is the backend server for a social media application built with **Node.js**, **Express**, and **MongoDB**. It handles user authentication, post creation, and image uploads.

---

## 🚀 Features

* **Email-based authentication** with OTP verification
* **User management**: Create, read, update user profiles
* **Post management**: Create, read, and interact with posts
* **Image uploads** using local storage or Cloudinary
* **CORS enabled** for frontend-backend communication
* **RESTful API endpoints**

---

## 🛠️ Tech Stack

* **Node.js** & **Express** - Backend server
* **MongoDB** - Database
* **Mongoose** - MongoDB ODM
* **dotenv** - Environment variable management
* **cors** - Cross-origin requests
* **multer** - File uploads
* **Cloudinary** - Cloud image hosting

---

## 💾 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/taskplanet
JWT_SECRET=super_secret_key
PORT=5000

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_USER=
EMAIL_PASS=
```

> Replace values with your own credentials.

4. Start the server:

```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

---

## 📂 Folder Structure

```
server/
├─ config/
│  └─ db.js           # MongoDB connection
├─ routes/
│  ├─ emailAuthRoutes.js
│  ├─ userRoutes.js
│  └─ postRoutes.js
├─ uploads/           # Stores uploaded images
├─ .env
├─ server.js
└─ package.json
```

---

## 📝 API Endpoints

### Authentication

* `POST /api/auth/send-otp` - Send OTP to email
* `POST /api/auth/verify-otp` - Verify OTP

### Users

* `GET /api/users/:id` - Get user by ID
* `PUT /api/users/:id` - Update user

### Posts

* `POST /api/posts/` - Create a post (with optional image)
* `GET /api/posts/` - Get all posts
* `GET /api/posts/:id` - Get post by ID
* `PUT /api/posts/:id/like` - Like a post
* `DELETE /api/posts/:id` - Delete a post

---

## 📷 Image Uploads

Images can be stored locally in the `uploads` folder or on Cloudinary. The server serves local images statically:

```
http://localhost:5000/uploads/<filename>
```

---

## 🔧 Environment Variables

| Variable              | Description                       |
| --------------------- | --------------------------------- |
| MONGO_URI             | MongoDB connection string         |
| JWT_SECRET            | Secret key for JWT authentication |
| PORT                  | Server port (default: 5000)       |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name             |
| CLOUDINARY_API_KEY    | Cloudinary API key                |
| CLOUDINARY_API_SECRET | Cloudinary API secret             |
| EMAIL_USER            | Email for sending OTPs            |
| EMAIL_PASS            | Password for email                |

---

## 💡 Tips

* Use tools like **Postman** or **Insomnia** to test API endpoints
* Implement **JWT authentication** for enhanced security
* Configure Cloudinary for production-ready image hosting

---

## ⚡ Server Test

After starting the server, check:

```
GET http://localhost:5000/
```

Response:

```json
"API is running..."
```
