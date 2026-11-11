import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./page/Home";
import About from "./page/About";
import Projects from "./page/Projects";
import Education from "./page/Education";
import Services from "./page/Service";
import Contact from "./page/Contact";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Account from "./page/Account";
import AdminContacts from "./page/AdminContacts";
import Unauthorized from "./page/Unauthorized";
import NotFound from "./page/NotFound";

function App() {
  return (
    // AuthProvider makes "who is signed in?" available to every page below it
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Any signed-in user */}
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />

          {/* Administrators only */}
          <Route
            path="/admin/contacts"
            element={<ProtectedRoute adminOnly><AdminContacts /></ProtectedRoute>}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
