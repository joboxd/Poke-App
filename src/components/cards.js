import React, { useMemo } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import SingleCard from './card'
import { useState } from "react";
import "./cards.css"
import PaginationBasic from './Pagination';

function Cards({ pokemons, loading, pokemonPerPage, setPokemonPerPage, limit, onChangeLimit, setPokemons, setLoading, setCurrentPage, currentPage, counter, setCounter }) {

  const [search, setSearch] = useState("");
  const selectorOptions = useMemo(() => {
    const options = [30, 50, 150]
    return options
  }, []);

  const filteredPokemons = () => {
    if (search.length === 0) {

      if (pokemonPerPage == 0) {
        return pokemons.slice(pokemonPerPage, pokemonPerPage + limit);
      }

      return pokemons.slice(pokemonPerPage - limit, pokemonPerPage);
    } else {
      const searcharr = pokemons.filter(
        poke => poke.forms[0].name.includes(search)
      )
      return searcharr.slice(pokemonPerPage, pokemonPerPage + limit);
    }

  }
  const onChangeSearch = (event) => {
    setPokemonPerPage(0);
    setSearch(event.target.value);
  }


  if (loading) return (
    <Spinner animation="grow" variant="light" />
  )

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6'>
          <p id='how_many' ><strong>HOW MANY POKEMONS WOULD YOU LIKE TO SEE PER PAGE?:
          </strong></p>
          <select id="selector" onChange={onChangeLimit}>
            {selectorOptions.map(value => (
              <option key={value}>{value}</option>)
            )
            }
          </select>
        </div>

        <div className='col-6' >
          <input
            id='findPoke'
            placeholder='Find your pokemon'
            value={search}
            onChange={onChangeSearch} ></input>
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
        </div>


      </div>





      <br />
      <br />
      <div className='row'>
        {
          filteredPokemons().map(card => (
            <div key={card.forms[0].name} className="pokemonCard col-2" >

              <SingleCard
                pokemon_id={card.id}
                pokemon_name={card.forms[0].name}
                pokemon_ability={card.abilities[0].ability.name}
                pokemon_img={card.sprites.front_default}
                pokemon_moves={card.moves[0]}
              />
            </div>
          ))
        }
      </div>

    </div>

  )
}

export default Cards