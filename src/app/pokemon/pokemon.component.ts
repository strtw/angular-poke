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

  compare( a:any, b:any ) {
    if ( a.id > b.id ){
      return -1;
    }
    if ( a.id < b.id ){
      return 1;
    }
    return 0;
  }

  handlePokemonTypeData(pokemon: { types: any; }){
     for(let type of pokemon.types){
      let typeName = type.type.name;
      if(!this.pokemonTypes.has(typeName)){
        this.pokemonTypes.add(typeName)
      }
     }
  }
  

  getIndivdualPokeManData(num: number, maxNum:number){
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${num}`).subscribe(data => {
      data.id = num;
      this.appPokemonData.push(data);
      this.handlePokemonTypeData(data);
      if(this.appPokemonData.length === maxNum){
        this.appPokemonData.sort( this.compare );
        this.isLoaded = true;
        this.typesList = Array.from(this.pokemonTypes)
      }
  })
  }

    ngOnInit() {      
        // Simple GET request with response type <any>
        this.http.get<any>('https://pokeapi.co/api/v2/pokemon/').subscribe(data => {
            this.pokemonNameEndpointData = data;
           // console.log(this.pokemonNameEndpointData);
            const numPokemon = data.results.length;
            this.appPokemonData = [];
            for(let i = 1; i <= numPokemon; i++){
              this.getIndivdualPokeManData(i,numPokemon);
            }
            console.log(this.appPokemonData);
        })
    }  
}
