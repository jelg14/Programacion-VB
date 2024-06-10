import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { LoadingComponent } from '../shared/loading/loading.component';
import { SpotifyService } from '../../services/service.service';

@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [LoadingComponent, NoimagePipe, DomseguroPipe, CommonModule, RouterModule],
  templateUrl: './artista.component.html',
  styleUrl: './artista.component.css'
})
export class ArtistaComponent {
  artista: any = {};
  topTracks: any[] = [];
  loading: boolean = false;

  constructor(private spotify: SpotifyService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    this.spotify.getArtist(id).subscribe(artista => {
      this.artista = artista;
      this.loading = false;
      // console.log(artista);
    });
  }
  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe(topTracks => {
      this.topTracks = topTracks.tracks;
      console.log(this.topTracks);
    });
  }
}
