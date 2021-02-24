import react,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import classes from './pokedexPokemonPage.module.css'
import HeaderIndexPage from '../../components/headerIndexPage/headerIndexPage'


class pokedexPokemonPage extends Component{
    state = {       
        pokemon: {}
    }

    componentDidMount(){
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`).then(res=>{
            this.setState({
                pokemon:res.data
            })
        })
    }
    
    render(){
        const height = this.state.pokemon.height * 0.10 
        const weight = this.state.pokemon.weight * 0.10


        return(
            <react.Fragment>
                <HeaderIndexPage/>
                <main>
                    <section className={classes.pokemon}>
                        <NavLink className={classes.backBtn} exact to="/">Return</NavLink>
                        
                        <h1 className={classes.pokemon__name}>{this.state.pokemon.name}</h1>
                        <h4 className={classes.pokemon__id}>#{this.state.pokemon.id}</h4>
                        
                        <img className={classes.pokemon__img} src={this.state.pokemon.sprites? this.state.pokemon.sprites.front_default:null} alt={this.state.pokemon.name}></img>
                        
                        <ul className={classes.list__types}>
                            {this.state.pokemon.types? this.state.pokemon.types.map(e=>{
                                return <h3 key={e.type.name}> {e.type.name} </h3>
                            }):null}
                        </ul>
                        
                        
                        <div className={classes.pokemon__attributes}>
                            <ul className={classes.pokemon__feature}>
                                <h2 className={classes.pokemon__feature__title}>Profile</h2>
                                <li>Height: {height.toFixed(2)}m</li>
                                <li>Weight: {weight.toFixed(1)}kg</li>
                            </ul>
                           
                            <ul className={classes.pokemon__feature}>
                                <h2 className={classes.pokemon__feature__title}>Abilites</h2>
                                {this.state.pokemon.abilities? this.state.pokemon.abilities.map(e=>{
                                    
                                    return <li key={e.ability.name}> {e.ability.name} </li>
                                }):null}
                            </ul>
                            
                            <ul className={classes.pokemon__feature}>
                                <h2 className={classes.pokemon__feature__title}>Stats</h2>
                                {this.state.pokemon.stats? this.state.pokemon.stats.map(e=>{
                                    return <li key={e.stat.name}>{e.stat.name}: {e.base_stat}</li>
                                }):null}
                            </ul>
                        </div>
                    </section>
                </main>
            </react.Fragment>
        )
    }

}



export default pokedexPokemonPage