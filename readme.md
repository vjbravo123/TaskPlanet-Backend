
# 🌐 Social Media App Server

This is the **backend server** for the *TaskPlanet Social Media Application*, built using **Node.js**, **Express**, and **MongoDB**.  
It powers user authentication (via **Google Sign-In** or **OTP verification using Brevo API**), post creation (with either **text or image**), and secure image uploads.

---

## 🚀 Features

### 🔐 Authentication & Verification
- **Google Authentication** – Users can sign in using their Google accounts.
- **Email OTP Verification** – OTPs are securely sent using the **Brevo API** for user verification.
- **JWT-based Sessions** – Ensures secure user authentication and session management.

### 📝 Post Management
- Create posts with **either text or an image** (one is required).
- Like and comment on other users’ posts.
- Posts are displayed in reverse chronological order.

### 👤 User Management
- Create, update, and manage user profiles.
- Supports verified users only for posting.

### 🖼️ Image Handling
- Upload images via **Multer**.
- Images stored on **Cloudinary** or locally in `/uploads`.

### ⚙️ API & Communication
- **CORS-enabled** for smooth frontend-backend interaction.
- **RESTful API structure** for scalability and modularity.

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Backend Framework** | Node.js, Express |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Authentication** | JWT, Google OAuth 2.0 |
| **Email Service** | Brevo API (for OTP verification) |
| **File Uploads** | Multer |
| **Cloud Storage** | Cloudinary |
| **Environment Config** | dotenv |

---

## 💾 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/vjbravo123/TaskPlanet-Backend.git
cd TaskPlanet-Backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/taskplanet
JWT_SECRET=super_secret_key
PORT=5000

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

BREVO_API_KEY=your_brevo_api_key
```

> ⚠️ Replace placeholders with your actual credentials.

### 4️⃣ Start the Server

```bash
npm run dev
```

The server runs on **http://localhost:5000** by default.

---

## 📂 Folder Structure

```
server/
├─ config/
│  └─ db.js              # MongoDB connection
├─ routes/
│  ├─ emailAuthRoutes.js # OTP verification via Brevo API
│  ├─ googleAuthRoutes.js      # User management routes
│  └─ postRoutes.js      # Post creation, likes, and comments
├─ uploads/              # Stores uploaded images locally
├─ controllers/          # Route handlers
├─ models/               # Mongoose schemas
├─ .env
├─ server.js
└─ package.json
```

---

## 🧭 API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/auth/send-otp` | Send OTP using **Brevo API** |
| `POST` | `/api/auth/verify-otp` | Verify OTP for login/signup |
| `POST` | `/api/auth/google` | Sign in with Google |

### 👤 Users

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/users/:id` | Get user details |
| `PUT` | `/api/users/:id` | Update user profile |

### 📝 Posts

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/posts/` | Create post (either text or image required) |
| `GET` | `/api/posts/` | Get all posts |
| `GET` | `/api/posts/:id` | Get a specific post |
| `PUT` | `/api/posts/:id/like` | Like or unlike a post |
| `DELETE` | `/api/posts/:id` | Delete a post |

---

## 📸 Image Uploads

Images can be stored locally or uploaded to **Cloudinary**.

Local image access URL:
```
http://localhost:5000/uploads/<filename>
```

---

## 🔧 Environment Variables

| Variable | Description |
|-----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT authentication |
| `PORT` | Server port (default 5000) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `BREVO_API_KEY` | Brevo API key for OTP service |

---

## 🌍 Deployment Info

- **GitHub Repository:** [TaskPlanet Backend](https://github.com/vjbravo123/TaskPlanet-Backend.git)
- **Live Server:** [https://taskplanet-backend-sm2h.onrender.com](https://taskplanet-backend-sm2h.onrender.com)

> 🕐 *Note:* This backend is hosted on **Render Free Tier**. Please wait up to **1 minute** for the first response if it’s been idle.

---

## 💡 Developer Tips

- Use **Postman** or **Insomnia** to test APIs.
- Always keep your `.env` private.
- For production, enable **HTTPS**, **rate limiting**, and **input validation**.

---

### 🧑‍💻 Author

**Vivek Joshii**  
🔗 [GitHub: @vjbravo123](https://github.com/vjbravo123)

---

> 💬 *A full-featured backend for the TaskPlanet app with secure OTP verification, Google auth, and text/image-based social posting.*
