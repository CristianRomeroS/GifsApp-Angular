import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html'
})
export class ResultadosComponent {
  get resultados(){
    return this.giftsService.resultados;
  }
  constructor(private giftsService:GifsService){}
 
}
