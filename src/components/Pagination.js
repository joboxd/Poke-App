import Pagination from 'react-bootstrap/Pagination';
import "./Pagination.css";


function PaginationBasic({ pokemons, limit, setPokemonPerPage, currentPage, setCurrentPage, counter }) {

  let items = [];
  let pages = 0;


  pages = Math.ceil(pokemons.length / limit);
  const cliked = (number) => {
    setCurrentPage(number)
    return (setPokemonPerPage(limit * number));

  }

  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item onClick={() => { cliked(number) }} key={number}  >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div className='row' >

      <Pagination className='col' id='cells'>

        {items}

      </Pagination>

      <br />
    </div>)
}


export default PaginationBasic