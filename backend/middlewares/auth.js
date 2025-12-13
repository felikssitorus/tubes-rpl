// middlewares/auth.js - SIMPLE VERSION
const pool = require("../config/db");

const authenticate = async (req, res, next) => {
  try {
    
    
    
    // Contoh: Cek header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      // Untuk testing, kita set dummy user
      req.user = {
        email: "admin@unpar.ac.id",
        role: "admin",
        id: "admin001"
      };
      return next();
    }
    
    // Jika ada token, validasi (implementasi nanti)
    // const token = authHeader.split(' ')[1];
    // ... validasi token
    
    req.user = {
      email: "admin@unpar.ac.id",
      role: "admin",
      id: "admin001"
    };
    
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ 
      message: "Forbidden: Admin access required" 
    });
  }
};

module.exports = { authenticate, authorizeAdmin };