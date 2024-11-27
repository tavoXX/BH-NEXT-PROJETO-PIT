import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
