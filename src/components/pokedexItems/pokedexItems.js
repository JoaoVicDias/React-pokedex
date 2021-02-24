import classes from './pokedexItems.module.css'
import PokedexPokemons from './pokedexPokemons/pokedexPokemons'

const PokedexItems = props =>{


    return(
        <section className={classes.pokemon__items}>
           {  props.fetchError ? <h1 style={{margin:"50px auto"}}>No pokemon was found...</h1>:props.pokemonsFilteredByName.length>0?
           props.pokemonsFilteredByName.map(e=>{
            if(!e.sprites.front_default){
                return null
            }else{
                return <PokedexPokemons key={e.name}
                 pokemonName={e.name}  
                 pokemonImg={e.sprites.front_default}
                 pokemonId={e.id}
                  />
            }
        })
           :props.pokemonsFilteredType.length > 0 ? 
                props.pokemonsFilteredType.map(e=>{
                    if(!e.sprites.front_default){
                        return null
                    }else{
                        return <PokedexPokemons key={e.name}
                         pokemonName={e.name}  
                         pokemonImg={e.sprites.front_default}
                         pokemonId={e.id}
                          />
                    }
                })
           : props.pokemonsFilteredGen.length > 0 ? 
                props.pokemonsFilteredGen.map(e=>{
                    if(!e.sprites.front_default){
                        return null
                    }else{
                        return <PokedexPokemons key={e.name}
                         pokemonName={e.name}  
                         pokemonImg={e.sprites.front_default}
                         pokemonId={e.id}
                          />
                    }
                })
            :props.pokemonsData.map(e=>{
                if(!e.sprites.front_default){
                    return null
                }else{
                    return <PokedexPokemons key={e.name}
                     pokemonName={e.name}  
                     pokemonImg={e.sprites.front_default}
                     pokemonId={e.id}
                      />
                }
                })}
        </section>
    )
}



export default PokedexItems