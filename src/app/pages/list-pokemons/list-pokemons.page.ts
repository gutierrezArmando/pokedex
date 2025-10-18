import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, LoadingController, IonGrid, IonRow, IonCol,
  IonImg, IonText, IonCard, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';
import { IPokemon } from 'src/app/interfaces/ipokemon';
import { SPokemon } from 'src/app/services/spokemon';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonText, IonCard, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent]
})
export class ListPokemonsPage {

  private pokemonService: SPokemon = inject(SPokemon);

  //Inyeccion de la dependencia, no olvidar importarlo
  private loadingCtroller: LoadingController = inject(LoadingController);

  //inyectar la dependencia
  private router: Router = inject(Router)


  //variable para almacenar todos los poquemos en pantalla
  pokemons: IPokemon[] = [];


  constructor() { }


  ionViewWillEnter(){
    this.getMorePokemons();
  }

  async getMorePokemons(event?: InfiniteScrollCustomEvent){
    //constante para almacenar la promesa
    const promisePokemons = this.pokemonService.getPokemons();

    if(promisePokemons){//validando que no sea null
      let loading:any;
      if(!event){
        //se crea el controlador para el ion-loading
        loading = await this.loadingCtroller.create({
          message: 'Cargando...',
        });
        loading.present();//hace que se muestre el loading
      }

      //Se manda llamar la promesa
      promisePokemons.then( ( pokemons: IPokemon[] ) => {
        //El nuevo arreglo de pokemons obtenidos, se
        //concatena con el de la clase interna
        //es decir, los que estaban, mas los nuevos
        this.pokemons = this.pokemons.concat(pokemons);
      })
      .catch( ( error ) => console.log(error) )//Si ocurre un error
      .finally(()=>{
        //Bloque que se ejecuta al completar o al tener error
        //asegura que el loading cierre
        loading?.dismiss();//cierra el loading
        event?.target.complete();//Se cierra el mensaje del scroll infinito
      });

    }
  }


  //Se crea la función para mostrar la pagina
  goToPage(pokemon: IPokemon){
    //se utiliza el navigate de router
    //espera un arreglo para la ruta
    //parte1/parte2/.../parteN
    //[parte1, parte2,..., parteN]
    console.log("Aqui entra");
    this.router.navigate(['detail-pokemon',pokemon.id]);
  }

}

