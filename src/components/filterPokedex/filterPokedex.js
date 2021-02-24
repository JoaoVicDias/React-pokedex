import classes from './filterPokedex.module.css'



const FilterPokedex = props =>{

    return(
        <section className={classes.filter__pokedex__handler}>
            <div className={classes.filter__pokedex__select__items}>
                <select onChange={(event)=>props.filterPokemonsByGen(event)} className={classes.filter__pokedex__select__item} >
                    <option>Filter By Generation</option>
                    <option>All</option>
                    {props.pokemonsGen.map(e=>{
                        return <option key={e.name}> {e.name} </option>
                    })}
                </select>
                <select onChange={(event)=>props.filterPokemonsByType(event)} className={classes.filter__pokedex__select__item}>
                    <option>Filter By Type</option>
                    <option>All</option>
                    {props.pokemonsType.map(e=>{
                        return <option key={e.name}> {e.name} </option>
                    })}
                </select>
            </div>
            <form className={classes.filter__pokedex__form__items} onSubmit={((event)=>props.filterPokemonsByName(event))}>
            <input className={classes.filter__pokedex__input__item} value={props.inputSearchValueHandlerData} onChange={((event)=>props.inputSearchValueHandler(event))} type="text" placeholder="Search by name..." />
            <button className={classes.filter__pokedex__input__item__btn} >Search</button>
            </form>
        </section>
    )
}


export default FilterPokedex