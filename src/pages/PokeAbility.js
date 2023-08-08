import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';


const PokeAbility = () => {
    const [abilities, setAbilities] = useState([]);

    const getAbilities = async () => {
        try {
            const request = await fetch(`${process.env.REACT_APP_POKE_API}/ability/?limit=327`);
            const response = await request.json();

            const pokeAbilities = await Promise.all(response.results.map(async (results) => {
                const abilityRequest = await fetch(results.url)
                return await abilityRequest.json();
            }));

            setAbilities(pokeAbilities);
        } catch (error) {
            console.error(error)
        }
    }
    const getPokemonsWithAbilities = (pokemon) => {
        const getArrayPokemonsWithAbilities = pokemon.map(item => {
            if (item.pokemon.name.length > 0) {
                return (<li>
                    <ul>
                        {item.pokemon.name}
                    </ul>
                </li>)
            } else {
                return "There is not pokemon with this ability"
            }
        }
        );
        return getArrayPokemonsWithAbilities
    }
    const getEffectEntries = (effectEntries) => {
        if (effectEntries.length > 0) {
            const enEffectObject = effectEntries.find(effect => effect.language.name == 'en');
            if (enEffectObject) return enEffectObject.effect;
            else effectEntries[0].effect;
        } else {
            return "Has no effect"
        }
    }

    useEffect(() => {
        getAbilities();
    }, [])

    return (
        <Container>
            <h1>ABILITYS AND DESCRIPTION</h1>
            <Table striped bordered hover variant="dark" size="sm" responsive="sm">
                <thead>
                    <tr >
                        <th>ID</th>
                        <th>Name</th>
                        <th>Effect Entries</th>
                        <th>Pokemons with this ability</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        abilities.map(ability =>
                            <tr>
                                <td>
                                    {ability.id}
                                </td>

                                <td>
                                    {ability.name}
                                </td>

                                <td >
                                    {getEffectEntries(ability.effect_entries)}
                                </td>
                                {getPokemonsWithAbilities(ability.pokemon)}
                                <td>

                                </td>

                            </tr>
                        )
                    }


                </tbody>
            </Table>

        </Container>

    )
}

export default PokeAbility;
