import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Movies from "./components/Movies";
import SearchResults from "./components/SearchResults";
import Details from "./components/Details";
import Error from "./components/Error";
import ActorDetails from "./components/ActorDetails";

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Movies />} />
            <Route path=":searchTerm" element={<SearchResults />} />
            <Route path="movie/:movieId" element={<Details />} />
            <Route path="actor/:actorId" element={<ActorDetails />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
