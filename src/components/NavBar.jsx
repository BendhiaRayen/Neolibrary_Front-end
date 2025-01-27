import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import "../index.css"; // Optional if you want additional styling

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to Home page
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Logo />
        <span className="logo-text" onClick={() => navigate("/dashboard")}>
          NeoLibrary
        </span>
      </div>
      <div className="navbar-links">
        {/* Logout Button */}
        <button className="navbar-link logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
