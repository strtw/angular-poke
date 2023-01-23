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


  getIndivdualPokeManData(num: number){
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${num}`).subscribe(data => {
      //console.log(data);
      this.appPokemonData.push(data)
  })
  }

    ngOnInit() {      
        // Simple GET request with response type <any>
        this.http.get<any>('https://pokeapi.co/api/v2/pokemon/').subscribe(data => {
            this.pokemonNameEndpointData = data;
           // console.log(this.pokemonNameEndpointData);
            const numPokemon = data.results.length;
            for(let i = 1; i <= numPokemon; i++){
              this.appPokemonData = [];
              this.getIndivdualPokeManData(i);
            }
            console.log(this.appPokemonData);

        })
    }
    
}
