import "./App.css";
import Login from "./pages/login";
import Main from "./pages/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import SharedSpace from "./pages/SharedSpace";
import SuggestionList from "./components/SuggestionList";
import SuggestionForm from "./components/SuggestionForm";
import LibraryOfResources from "./pages/LibraryofResources";
import ResourceList from "./components/ResourceList";
import ResourceForm from "./components/ResourceForm";
import ExploreCategories from "./pages/Category";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SharedSpace"
          element={
            <ProtectedRoute>
              <SharedSpace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/LibraryofResources"
          element={
            <ProtectedRoute>
              <LibraryOfResources />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ExploreCategories"
          element={
            <ProtectedRoute>
              <ExploreCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suggestion-list"
          element={
            <ProtectedRoute>
              <SuggestionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suggestion-form"
          element={
            <ProtectedRoute>
              <SuggestionForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resource-list"
          element={
            <ProtectedRoute>
              <ResourceList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resource-form"
          element={
            <ProtectedRoute>
              <ResourceForm />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
