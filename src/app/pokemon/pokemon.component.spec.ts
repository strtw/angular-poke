import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { PokemonComponent } from './pokemon.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  const pokemon = [{"types": [
    {
    "slot": 1,
    "type": {
    "name": "grass",
    "url": "https://pokeapi.co/api/v2/type/12/"
    }
    },
    {
    "slot": 2,
    "type": {
    "name": "poison",
    "url": "https://pokeapi.co/api/v2/type/4/"
    }
    },
    {
      "slot": 3,
      "type": {
      "name": "poison",
      "url": "https://pokeapi.co/api/v2/type/4/"
      }
      }
    ], 
    "name": "bulbasaur",
    "id": 1},
    {"types": [
      {
      "slot": 1,
      "type": {
      "name": "cat",
      "url": "https://pokeapi.co/api/v2/type/12/"
      }
      },
      {
      "slot": 2,
      "type": {
      "name": "dog",
      "url": "https://pokeapi.co/api/v2/type/4/"
      },
      },
      ], 
      "name": "ivysaur",
      "id": 2}]
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, 
        MatFormFieldModule, 
        MatTableModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      declarations: [ PokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter correctly', () => {
    let userSelections = ["grass", "poison"]
    let result = pokemon.filter(component.filterByType(userSelections))
    expect(result.length).toBe(1)
   
    userSelections = ["grass", "poison", "house"]
    result = pokemon.filter(component.filterByType(userSelections))
    expect(result.length).toBe(0)
  });

  it('should reverse sort correctly', () => {
    pokemon.sort(component.compareById);
    expect(pokemon[0].name).toBe("ivysaur")})

  it('should add correct number of types to filter type set', () => {
    component.addPokemonTypeToFilterSetIf(pokemon[0])
    expect(component.pokemonTypes.size).toBe(2)
  });  

  it('should set the loaded flag true when the pokemon data is loaded', () => {
    //TODO write this test
    //getIndivdualPokeManData(1,1)
    // need to mock http service
  });  

  
});
