import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SPokemon {

  private readonly URL_BASE = 'https://pokeapi.co/api/v2/pokemon';

  private nextUrl = `${this.URL_BASE}?limit20&offset=0`;


  getPokemons(){
    if(this.nextUrl){

    }
    return null;
  }

}
