import 'animate.css';
import Cards from "../components/cards";
import "./pages.css"
import { useEffect, useState } from "react";
import PaginationBasic from "../components/Pagination";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

const PokemonHome = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pokemonPerPage, setPokemonPerPage] = useState(0);
  const [limit, setLimit] = useState(30);
  const [currentPage, setCurrentPage] = useState(0);
  const [counter, setCounter] = useState(0);


  const getPokemons = async () => {
    try {
      const request = await fetch(`${process.env.REACT_APP_POKE_API}/pokemon/?offset=0&limit=150`);
      const response = await request.json();
      //Getting ALL the info from each Pokemon with MAP (Add new pokemons in the array) meal time :)
      const pokemonInfoArray = await Promise.all(response.results.map(async (poke) => {
        const pokeRequest = await fetch(poke.url);
        return await pokeRequest.json();
      }
      ));

      if (counter > 0) {
        let newPokemons = [...pokemons, ...pokemonInfoArray]
        setPokemons(newPokemons)
      } else setPokemons(pokemonInfoArray);

      setCounter(counter + 1);
      setTimeout(() => {
        setLoading(false);
      }, 2000)

    } catch (error) {
      setLoading(false);
    }

  };
  const onChangeLimit = (event) => {
    setLimit(+event.target.value);
  }
  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div id="pokehome" className="container">
      <img className="animate__bounce" id="banner" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1920px-International_Pok%C3%A9mon_logo.svg.png" />
      <br /><br /><br />



      <PaginationBasic
        pokemons={pokemons}
        setPokemons={setPokemons}
        limit={limit}
        setLoading={setLoading}
        setPokemonPerPage={setPokemonPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        counter={counter}
        setCounter={setCounter}
      />


      <Cards
        pokemonPerPage={pokemonPerPage}
        setPokemonPerPage={setPokemonPerPage}
        pokemons={pokemons}
        loading={loading}
        limit={limit}
        onChangeLimit={onChangeLimit}

      />
      <br />
    </div>
  )


};

export default PokemonHome;