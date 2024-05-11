import { Component, Input } from '@angular/core';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { CommonModule } from '@angular/common';
import {  RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [NoimagePipe, CommonModule, RouterModule],
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.css'
})
export class TarjetasComponent {
  @Input() items: any[] = [];
  constructor(private route: Router){}
  verArtista(item: any){
    let artistaId;
    if (item.type ==='artist') {
      artistaId = item.id;
    }else{
      artistaId = item.artista[0].id;
    }
    this.route.navigate(['/artist',artistaId])
  }
}
