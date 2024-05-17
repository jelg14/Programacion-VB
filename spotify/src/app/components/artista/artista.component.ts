import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [],
  templateUrl: './artista.component.html',
  styleUrl: './artista.component.css'
})
export class ArtistaComponent {
  id: string | null;

  constructor(private route:ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
