import { Route } from 'react-router-dom'
import PokedexIndexPage from './conteiner/pokedexIndexPage'
import PokedexPokemonPage from './conteiner/pokedexPokemonPage/pokedexPokemonPage'



function App() {
  return (
    <div className="App">
      <Route  path="/pokemon/:id" exact component={PokedexPokemonPage} />
      <Route path="/" exact  component={PokedexIndexPage}/>  
    </div>
  );
}

export default App;
