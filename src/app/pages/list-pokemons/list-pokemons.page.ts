import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SPokemon } from 'src/app/services/spokemon';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListPokemonsPage {

  private pokemonService: SPokemon = inject(SPokemon);
  constructor() { }


  ionViewWillEnter(){
    this.getMorePokemons();
  }

  getMorePokemons(){
    this.pokemonService.getPokemons();
  }

}

