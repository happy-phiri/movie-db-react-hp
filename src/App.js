import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Movies from "./components/Movies";
import SearchResults from "./components/SearchResults";
import Details from "./components/Details";
import Error from "./components/Error";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <main className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/results/:searchTerm" element={<SearchResults />} />
          <Route path="/movie/:movieId" element={<Details />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
