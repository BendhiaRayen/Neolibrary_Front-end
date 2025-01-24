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
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/SharedSpace" element={<SharedSpace />} />
        <Route path="/suggestion-list" element={<SuggestionList />} />
        <Route path="/suggestion-form" element={<SuggestionForm />} />
        <Route path="/LibraryofResources" element={<LibraryOfResources />} />
        <Route path="/resource-list" element={<ResourceList />} />
        <Route path="/resource-form" element={<ResourceForm />} />
        <Route path="/ExploreCategories" element={<ExploreCategories />} />
      </Routes>
    </Router>
  );
}

export default App;
