import classes from './headerIndexPage.module.css'
import PokeballPng from '../assets/pokeball.png'


const headerIndexPage = () =>{

    return(
        <header className={classes.header__index__page}>
            <div className={classes.header__index__page__items}>
                <img className={classes.header__index__page__item__img} src={PokeballPng} alt="Pokeball"></img>
                <h1 className={classes.header__index__page__item__title} >Pokedex</h1>
            </div>
        </header>
    )
}


export default headerIndexPage