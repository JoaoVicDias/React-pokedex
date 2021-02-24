import React,{ Component } from 'react'
import axios from 'axios'
import HeaderIndexPage from '../components/headerIndexPage/headerIndexPage'
import FilterPokedex from '../components/filterPokedex/filterPokedex'
import PokedexItems from '../components/pokedexItems/pokedexItems'
import Pagination from '../components/pagination/pagination'


class PokedexIndexPage extends Component{

    state = {
        pokemonsGen:[],
        pokemonsType:[],
        pokemons:[],
        pokemonsFilteredGen:[],
        pokemonsFilteredType:[],
        pokemonsFilteredByName:[],
        searchInputValue:"",
        fetchError:false,
        prevUrl:null,
        nextUrl:null
    }

    componentDidMount(){
        this.GetPokemonsHandler("https://pokeapi.co/api/v2/pokemon")
        this.GetPokedexGenerationsHandler()
        this.GetPokedexTypeHandler()
    }

    GetPokemonsHandler = (url)=>{
        axios.get(url).then(res =>{
            this.setState({prevUrl:res.data.previous,nextUrl:res.data.next})
            res.data.results.map(e=>{
                return axios.get(`${e.url}`).then(result=>{
                    this.setState({pokemons:this.state.pokemons.concat(result.data)})
                    this.OrderPokemonsHandler("pokemons")
                })
               })    
        }).catch(err=>{
            console.log(err)
        })
    }


    GetPokedexGenerationsHandler = ()=>{
        axios.get("https://pokeapi.co/api/v2/generation").then(res =>{
            this.setState({pokemonsGen:this.state.pokemonsGen.concat(res.data.results)})
        }).catch(err=>{
            console.log(err)
        })
    }

    GetPokedexTypeHandler = ()=>{
        axios.get("https://pokeapi.co/api/v2/type").then(res =>{
            this.setState({pokemonsType:this.state.pokemonsType.concat(res.data.results)})
        }).catch(err=>{
            console.log(err)
        })
    }

    FilterPokemonsByGen = (event)=>{
        this.setState({pokemonsFilteredGen:[],pokemonsFilteredType:[],pokemonsFilteredByName:[],fetchError:false})
        
        if(event.target.value === "All" || event.target.value === "Filter By Generation"){
            return this.setState({pokemonsFilteredGen:[]})
        }

        axios.get(`https://pokeapi.co/api/v2/generation/${event.target.value}`).then(res=>{
            res.data.pokemon_species.map(e=>{
                return axios.get(e.url).then(result=>{
                    axios.get(result.data.varieties[0].pokemon.url).then(pokemonData =>{
                        this.setState({pokemonsFilteredGen:this.state.pokemonsFilteredGen.concat(pokemonData.data)})
                        this.OrderPokemonsHandler()
                    })
                })
            })
        })
    }

    FilterPokemonsByType = (event)=>{
        this.setState({pokemonsFilteredType:[],pokemonsFilteredGen:[],pokemonsFilteredByName:[],fetchError:false})

        if(event.target.value === "All" || event.target.value === "Filter By Type"){
            return this.setState({pokemonsFilteredType:[]})
        }
        axios.get(`https://pokeapi.co/api/v2/type/${event.target.value}`).then(res =>{
            res.data.pokemon.map(e=>{
                return axios.get(e.pokemon.url).then(result=>{
                    this.setState({pokemonsFilteredType:this.state.pokemonsFilteredType.concat(result.data)})
                    this.OrderPokemonsHandler()
                })
            })
        })
    }

    FilteredPokemonsByName = (event)=>{
        this.setState({pokemonsFilteredByName:[],pokemonsFilteredGen:[],pokemonsFilteredType:[],fetchError:false})
        event.preventDefault()
        if(this.state.searchInputValue === ""){
            return this.setState({pokemonsFilteredByName:[],fetchError:true})
        }
        axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.searchInputValue.toLowerCase()}`).then(res =>{
            this.setState({pokemonsFilteredByName:this.state.pokemonsFilteredByName.concat(res.data)})
                }).catch(()=>{
                   return this.setState({fetchError:true})
                })
    }

    inputSearchValueHandler = (event)=>{
        if(event.target.value === ""){
            this.setState({pokemonsFilteredByName:[],fetchError:false})
        }
        this.setState({searchInputValue:event.target.value})
    }

    OrderPokemonsHandler = () =>{
        function compare(a,b) {
            if (a.id < b.id)
               return -1;
            if (a.id > b.id)
              return 1;
            return 0;
          }
        this.setState({pokemons:this.state.pokemons.sort(compare)})
        this.setState({pokemonsFilteredGen:this.state.pokemonsFilteredGen.sort(compare)})
        this.setState({pokemonsFilteredType:this.state.pokemonsFilteredType.sort(compare)})
    }

    PreviousBtnHandler = ()=>{
        this.setState({pokemons:[]})
        this.GetPokemonsHandler(this.state.prevUrl)
    }

    NextBtnHandler = () =>{
        this.setState({pokemons:[]})
        this.GetPokemonsHandler(this.state.nextUrl)
    }

    StartBtnHandler = () =>{
        this.setState({pokemons:[]})
        this.GetPokemonsHandler("https://pokeapi.co/api/v2/pokemon")
    }

    render(){


        const pagination = this.state.pokemonsFilteredGen.length > 20 || this.state.pokemonsFilteredType.length > 20 ? null
        : <Pagination 
        fetchError={this.state.fetchError}
        nextDisabled={this.state.nextUrl ? false :true} 
        prevDisabled={this.state.prevUrl ? false :true}
        startBtn={this.StartBtnHandler}
        nextBtn={this.NextBtnHandler} 
        prevBtn={this.PreviousBtnHandler} />

        return(
            <React.Fragment>
                <HeaderIndexPage/>
                <main style={{margin:"80px 50px"}}>   
                    <FilterPokedex 
                    filterPokemonsByGen={this.FilterPokemonsByGen}
                    filterPokemonsByType={this.FilterPokemonsByType}
                    filterPokemonsByName={this.FilteredPokemonsByName}
                    inputSearchValueHandler={this.inputSearchValueHandler}
                    inputSearchValueHandlerData={this.state.searchInputValue}
                    pokemonsGen={this.state.pokemonsGen}
                    pokemonsType={this.state.pokemonsType}/>
                    <PokedexItems 
                    fetchError={this.state.fetchError}
                    pokemonsData={this.state.pokemons}
                    pokemonsFilteredByName={this.state.pokemonsFilteredByName}
                    pokemonsFilteredGen={this.state.pokemonsFilteredGen}
                    pokemonsFilteredType={this.state.pokemonsFilteredType}
                     />
                     {this.state.fetchError?null:pagination}
                   
                </main>
            </React.Fragment>
        )
    }
}



export default PokedexIndexPage