import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  compare( a:any, b:any ) {
    
    if ( a.id > b.id ){
      return -1;
    }
    if ( a.id < b.id ){
      return 1;
    }
    return 0;
  }
  

  getIndivdualPokeManData(num: number){
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${num}`).subscribe(data => {
      data.id = num;
      this.appPokemonData.push(data);
      if(this.appPokemonData.length === 20){
        this.appPokemonData.sort( this.compare );
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
              this.getIndivdualPokeManData(i);
            }
            console.log(this.appPokemonData);
            this.isLoaded = true;
        })
    }
    
}
