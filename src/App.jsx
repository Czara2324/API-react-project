import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import BreedDetails from "./components/BreedDetails";
import Favourites from "./components/Favourites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breed/:breed" element={<BreedDetails />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );  
}

export default App;