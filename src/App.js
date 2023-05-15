import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/Pokemon';
import { Card } from './components/card/Card';
import Navbar from './components/navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [error, setError] = useState(false);
  const [pokeSearch , setPokeSearch] = useState("");

  useEffect(() => {
    const fetchPoemonDate = async () =>{
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);

      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous)
      setLoading(false);
    }
    fetchPoemonDate();
  }, []);

  const loadPokemon = async (data) => {
    let onePokemonDate = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(onePokemonDate);
  };
  

  const handleNextPage = async () => {
    setError(false);
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if(!prevURL){
      setError(true);
    } else {
      setError(false);
      setLoading(true);
      let prevData = await getAllPokemon(prevURL);
      await loadPokemon(prevData.results);
      setPrevURL(prevData.previous)
      setLoading(false);
    }
  };

  console.log(pokeSearch);

  return (
    <>
      <Navbar />
      <div className="App">
        <input type='text' value={pokeSearch} onChange={(e) => setPokeSearch(e.target.value)} />
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : <>
          <div className='pokemonCardContainer'>
            {pokemonData.filter((poke) => {
              const isMatchPoke = poke.name.indexOf(pokeSearch) !== -1;
              return isMatchPoke;
            })
            .map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>
          <div className='btn'>
            {error ? <p>最初のページだよ〜</p> : <></>}
            
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
        </>}
      </div>
    </>
  );
}

export default App;
