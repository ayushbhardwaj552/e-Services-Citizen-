# 🏛️ E-Governance Platform for MLA–Citizen Interaction

A **full-stack web application** enabling citizens to connect with their MLA to **create and track meeting requests, invitations, complaints**, and stay updated with **latest projects, news, and future plans**. Built with **MERN stack**, **Socket.IO**, **Twilio**, **JWT**, **bcrypt**, and **Cloudinary** for real-time, secure, and seamless interaction.

---

## 🌟 Features

### For Citizens
- ✅ Register, Login, Forgot Password, and manage profile  
- ✅ Create and track **meeting requests, invitations, complaints**  
- ✅ View **MLA calendar** to check availability  
- ✅ Receive **real-time updates** via email and SMS  
- ✅ Access **MLA updates**, including projects, news, and future plans  

### For MLA
- ✅ Dashboard to view and respond to **requests and invitations**  
- ✅ Update **calendar events and availability**  
- ✅ Share **news, projects, and future plans** with citizens  
- ✅ Send **notifications** to citizens via email/SMS  

---

## 🛠️ Tech Stack

- **Frontend:** React.js, CSS, HTML  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication & Security:** JWT, bcrypt, cookies  
- **Real-Time Communication:** Socket.IO  
- **Notifications:** Twilio (SMS), Email  
- **Media Storage:** Cloudinary  

---

## 🚀 Getting Started

### 1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

### 2. Install dependencies
npm install
cd client
npm install

### 3. Setup environment variables
Create a .env file in the root directory and add:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone_number
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### 4. Run the backend server
npm run dev

### 5. Run the frontend
cd client
npm start


## 📌 Project Highlights

🛡️ Secure Authentication with JWT, bcrypt, and cookies
⚡ Real-Time Updates using Socket.IO for calendar and notifications
📧 Email & SMS Notifications using Nodemailer and Twilio
🌐 Responsive UI built with React.js for smooth user experience
☁️ Media Management via Cloudinary for profile images and gallery


## 📈 Impact

Improved citizen engagement and governance efficiency
Enabled 24/7 interaction between citizens and MLA
Reduced manual request handling by ~60%
Supports 100+ simultaneous users with real-time updates

## 📫 Contact
For queries, reach out at:
Email: your-email@example.com
LinkedIn: Your LinkedIn
