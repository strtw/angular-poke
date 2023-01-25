import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  constructor(private http: HttpClient) { }
  pokemonNameEndpointData: any;
  appPokemonData: any;
  displayedColumns: string[] = ['name'];
  isLoaded = false;
  pokemonTypes = new Set();
  types = new FormControl('');
  typesList: any;
  userSelections: any;
  filteredResults:any;

  compareById( a:any, b:any ) {
    if ( a.id > b.id ){
      return -1;
    }
    if ( a.id < b.id ){
      return 1;
    }
    return 0;
  }

  addPokemonTypeToFilterSetIf(pokemon: { types: any; }){
     for(let type of pokemon.types){
      let typeName = type.type.name;
      if(!this.pokemonTypes.has(typeName)){
        this.pokemonTypes.add(typeName)
      }
     }
  }

  filterByType = (userSelections:any) =>{
      
    return function (pokemon:any){
      let currentPokemonTypes = new Set();
  
      for(let type of pokemon.types){
          currentPokemonTypes.add(type.type.name);
      }
   
      for(let type of userSelections){
        if(!currentPokemonTypes.has(type)){
          return false
        }
        
      }
      return true;
    }
  }

  filterResults(){
    this.filteredResults = this.appPokemonData.filter(this.filterByType(this.userSelections))
  }
  

  getIndivdualPokeManData(num: number, maxNum:number){
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${num}`;
    this.http.get<any>(endpoint).subscribe(data => {
      this.appPokemonData.push(data);
      this.addPokemonTypeToFilterSetIf(data);
      //TODO break this out into a separate function to separate concerns, or set a flag and then subscribe to that flag
      if(this.appPokemonData.length === maxNum){//if all pokemon data has been loaded
        this.appPokemonData.sort( this.compareById );//sort pokemon by id
        this.typesList = Array.from(this.pokemonTypes);//convert set to array
        this.isLoaded = true;
      }
  })
  }

  ngOnInit() {      
      this.http.get<any>('https://pokeapi.co/api/v2/pokemon/').subscribe(data => {
          this.pokemonNameEndpointData = data;
          const numPokemon = data.results.length;
          this.appPokemonData = [];
          for(let i = 1; i <= numPokemon; i++){
            this.getIndivdualPokeManData(i,numPokemon);
          }
      })
  }  
}
