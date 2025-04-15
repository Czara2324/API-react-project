import { BrowserRouter, Route, Routes, Link } from "react-router";
import Home from "./components/Home";
import BreedDetails from "./components/BreedDetails";
import Favourites from "./components/Favourites";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |
        <Link to="/favourites">Favourites</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breed/:breedName" element={<BreedDetails />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;