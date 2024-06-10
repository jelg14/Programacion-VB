import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NoimagePipe } from '../../pipes/noimage.pipe';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, NoimagePipe],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  @Input() items: any[] = [];
  getCategorie(item: any) {
    let categoryId;
    if(item.type === 'category') {
      categoryId = item.id;
    }else{
      categoryId = item.categories[0].id;
    }
    console.log(item);
  }
}
