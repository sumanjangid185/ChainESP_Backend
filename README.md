
---

# **ChainESP - Email Receiving Chain & ESP Detection System**

## **Overview**

**ChainESP** is a backend application built with **Node.js and NestJS** that processes incoming email data, extracts the email receiving chain from headers, and detects the **Email Service Provider (ESP)** type. The system stores both raw and processed email logs along with metadata in **MongoDB** for further analysis and reporting.

---

## **Features**

* ✅ **Process & Store Email Data** – Handles incoming email payload and logs raw + processed data.
* ✅ **Extract Email Headers** – Determines the email receiving chain for tracking.
* ✅ **ESP Detection Logic** – Identifies the Email Service Provider type from headers.
* ✅ **Proper Folder Structure & Best Practices** – Ensures maintainability and scalability.
* ✅ **Comprehensive Documentation** – Clear code comments and structured modules.

---

## **Tech Stack**

* **Backend:** Node.js with NestJS
* **Database:** MongoDB
* **Deployment:** Render (or any Node.js supported hosting platform)
* **Language:** TypeScript

---

## **Database Schema**

* **Email Logs**

  * `rawHeaders` – Original email headers.
  * `processedChain` – Extracted receiving chain.
  * `espType` – Detected ESP type.
  * `timestamp` – Time of processing.

---

## **Installation & Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/chainesp.git
cd chainesp
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### **4. Start the Server**

```bash
npm run start
```

or for development:

```bash
npm run start:dev
```



---
