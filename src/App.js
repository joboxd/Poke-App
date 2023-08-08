import { Routes, Route } from "react-router-dom";
import PokeAbility from "./pages/PokeAbility";
import PokemonHome from "./pages/PokemonHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonHome />} />
      <Route path="/Abilities" element={<PokeAbility />} />
    </Routes>
  );
}

export default App;
