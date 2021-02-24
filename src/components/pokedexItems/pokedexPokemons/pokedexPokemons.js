import classes from './pokedexPokemons.module.css'


const pokedexPokemons = props =>{

    return(
        <a href={`/pokemon/${props.pokemonId}`} className={classes.pokemon}>
            <div className={classes.pokemon__div__img}>
                <img className={classes.pokemon__img} src={props.pokemonImg} alt={props.pokemonName}></img>
            </div>
            <h2 className={classes.pokemon__name}> {props.pokemonName} </h2>
            <p className={classes.pokemon__id} >#{props.pokemonId}</p>
        </a>
    )
}



export default pokedexPokemons