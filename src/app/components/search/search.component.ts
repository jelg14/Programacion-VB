import { Component } from '@angular/core';
import { SpotifyService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../shared/loading/loading.component';
import { TarjetasComponent } from '../tarjetas/tarjetas.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LoadingComponent,TarjetasComponent, CommonModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  artistas: any[] = [];
  loading: boolean= false;

  constructor(private spotify: SpotifyService) { }
  buscar(termino: string) {
    this.loading = true;
    this.spotify.getArtists(termino)
      .subscribe((data: any) => {
        this.artistas = data.artists.items;
        this.loading = false;
      });
  }
}
