import { Card } from "./card/Card";

const PokemonList = ({ pokemonData }) => {
  console.log(pokemonData)

  return (
    <>
      {/* <div className='pokemonCardContainer'>
        {pokemonData.filter((poke) => {
  const isMatchPoke = poke.name.indexOf(pokeSearch) !== -1;
  return isMatchPoke;
})
        .map((pokemon) => {
          return <Card key={pokemon.name} pokemon={pokemon} />
        })}
      </div> */}
    </>
    
  )
}



export default PokemonList;