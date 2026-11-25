import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./page/Home"));
const About = lazy(() => import("./page/About"));
const Projects = lazy(() => import("./page/Projects"));
const Education = lazy(() => import("./page/Education"));
const Services = lazy(() => import("./page/Service"));
const Contact = lazy(() => import("./page/Contact"));
const SignIn = lazy(() => import("./page/SignIn"));
const SignUp = lazy(() => import("./page/SignUp"));
const Account = lazy(() => import("./page/Account"));
const AdminContacts = lazy(() => import("./page/AdminContacts"));
const Unauthorized = lazy(() => import("./page/Unauthorized"));
const NotFound = lazy(() => import("./page/NotFound"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Suspense fallback={<div>Loading...</div>}>
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
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />

            {/* Administrators only */}
            <Route
              path="/admin/contacts"
              element={
                <ProtectedRoute adminOnly>
                  <AdminContacts />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
