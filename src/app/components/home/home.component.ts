import { Component, OnInit } from '@angular/core';
import { LoadingComponent } from '../shared/loading/loading.component';
import { TarjetasComponent } from '../tarjetas/tarjetas.component';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from '../categorias/categorias.component';
import { SpotifyService } from '../../services/service.service';
import { take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports :[LoadingComponent, TarjetasComponent, CommonModule, CategoriasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  artist : any;
  albums: any;
  nuevasCanciones : any[] = []
  categorias : any[] = []
  artistas: any [] = []
  loading : boolean = false
  error : boolean = false
  mensajeError : string =""

  constructor(private spotify :SpotifyService){
  }

  ngOnInit(): void {
    this.spotify.getArtist2().subscribe(artist => {
      this.artist = artist;
      //console.log(artist);
    });
    this.spotify.getNewReleases().subscribe(data => {
      this.albums = data.albums.items;
      //console.log(data);
    });

    this.spotify.getCaterogies().subscribe(data => {
      this.categorias = data.categories.items;
      console.log(data);
      this.loading = false;
    }, error => {
      this.error = true;
      this.loading = false;
      this.mensajeError = error.error.error.message;
    });


    this.spotify.getArtists("genre:rock").subscribe(data => {
      this.artist = data.artists.items;
      console.log(this.artist);
    }, error=>{
      this.error = true;
      this.loading = false;
      this.mensajeError = error.error.error.message;
      
    });
  }
}

