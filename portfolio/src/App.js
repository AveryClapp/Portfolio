import "./App.css";
import Home from "./Components/Home/Home";
import BlogList from "./Components/BlogList/BlogList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="bg-stone-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
