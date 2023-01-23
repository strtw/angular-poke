import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonComponent } from './pokemon/pokemon.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent, 
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
