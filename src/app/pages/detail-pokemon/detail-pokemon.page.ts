import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, LoadingController, IonFab, IonFabButton, IonIcon,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg,
  IonGrid, IonRow, IonCol, IonText, IonProgressBar } from '@ionic/angular/standalone';
import { SPokemon } from 'src/app/services/spokemon';
import { IPokemon } from 'src/app/interfaces/ipokemon';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg,
    IonGrid, IonRow, IonCol, IonText, IonProgressBar ]
})
export class DetailPokemonPage {

  // El router vinculará automáticamente el parámetro de ruta 'id' a esta propiedad
  @Input() id!:number;

  private servicioPokemon : SPokemon = inject(SPokemon);

  private loadingCtroller: LoadingController = inject(LoadingController);

  private router: Router = inject(Router);

  pokemon!: IPokemon;

  constructor() {
    addIcons({
      closeOutline
    });
  }


  async ionViewWillEnter(){
    //se crea el controlador para el ion-loading
    let loading = await this.loadingCtroller.create({
          message: 'Cargando...',
    });
    loading.present();//hace que se muestre el loading
    console.log(`El id es: ${this.id}`);
    this.servicioPokemon.getPokemon( this.id )
    .then( ( pokemon: IPokemon ) => this.pokemon = pokemon )
    .finally(()=>{
      loading.dismiss();
    });
  }

  goBack(){
    this.router.navigateByUrl('list-pokemons');
  }

  toNumber(strNumber: string): number{
    return Number(strNumber);
  }

}



