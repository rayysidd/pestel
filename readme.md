Here’s a simple **README.md** for your PESTEL Analysis Dashboard project:

---

# **PESTEL Analysis Dashboard**

An AI-powered full-stack web application that generates and stores **PESTEL (Political, Economic, Social, Technological, Environmental, Legal) analysis** for companies and industries. Built with **MERN Stack (MongoDB, Express.js, React, Node.js)** and integrates the **Gemini API** for AI-generated insights.

---

## **🚀 Features**

- ✅ Generate PESTEL analysis for a company or industry
- ✅ Save and retrieve previous analyses
- ✅ Delete saved analyses
- ✅ AI-powered analysis generation using the **Gemini API**
- ✅ Simple and user-friendly UI

---

## **🛠️ Tech Stack**

- **Frontend**: React, Axios, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **AI API**: Gemini API
- **Tools**: Postman (for testing API requests), dotenv, CORS

---

## **📦 Installation & Setup**

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/yourusername/pestel-dashboard.git
cd pestel-dashboard
```

### **2️⃣ Backend Setup**

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a **.env** file and add:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/pestelDB
   PORT=5002
   GEMINI_API_KEY=your-api-key-here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### **3️⃣ Frontend Setup**

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Open **http://localhost:5173** in your browser.

---

## **🖥️ API Endpoints**

### **🔹 Generate PESTEL Analysis**

**POST** `/api/generate-pestel`  
**Body:**

```json
{
  "company": "Tesla",
  "sector": "Automotive"
}
```

**Response:**

```json
{
  "analysis": {
    "political": "...",
    "economic": "...",
    "social": "...",
    "technological": "...",
    "environmental": "...",
    "legal": "..."
  }
}
```

### **🔹 Save Analysis**

**POST** `/api/analysis`  
**Body:**

```json
{
  "company": "Tesla",
  "sector": "Automotive",
  "analysis": { ... },
  "date": "2025-03-03T12:00:00Z",
  "savedAt": "2025-03-03T12:05:00Z"
}
```

### **🔹 Get Saved Analyses**

**GET** `/api/analysis`

### **🔹 Delete Analysis**

**DELETE** `/api/analysis/:id`

---

## **🔧 Troubleshooting**

- If the backend doesn’t start, make sure **MongoDB is running**:
  ```bash
  mongod --dbpath /data/db
  ```
- If the frontend isn’t fetching data, check if **CORS is configured correctly** in `server.js`.
- Use **Postman** to manually test API routes.

---

## **📜 License**

MIT License. Free to use and modify.

---

This README gives a full overview of your project! Let me know if you need any edits. 🚀
