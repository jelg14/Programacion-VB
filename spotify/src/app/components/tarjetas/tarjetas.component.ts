import { Component, Input, OnInit } from '@angular/core';
import { NoimagePipe } from '../../pipes/noimage.pipe';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';
import {  RouterModule, Router } from '@angular/router';
import { SpotifyService } from '../../services/serv2.service';

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [NoimagePipe, CommonModule, RouterModule],
  providers: [ServiceService,SpotifyService],
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.css'
})
export class TarjetasComponent implements OnInit {
algo() {
  alert("dddd")
}

  @Input() items: any[] = [];

  constructor(private route: Router, private spoty: SpotifyService){}
    ngOnInit(){
      this.spoty.getArtists().subscribe((data)=>{
        this.items = data.artists.items;
        console.log(this.items[1].images[0].url);
      })
    }

  verArtista(item: any){
    let artistaId = "0TnOYISbd1XYRBk9myaseg";
    if (item.type ==='artist') {
      artistaId = item.id;
    }else{
      artistaId = item.artista[0].id;
    }
    this.route.navigate(['/artist',artistaId]); 
  }
}
