import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGiftsResponse,Gif } from '../Interface/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'T9rIdEVLR2cv5TkYWawUaWp5davleusX';
  private servicioUrl:string='https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];
  // cambiar any por su correespondiente
  public resultados:Gif[]=[];

  get historial(){

    return [...this._historial]
  }
  constructor(private http:HttpClient){
    this._historial=JSON.parse(localStorage.getItem('historial')!)||[];
    // resultados 
    this.resultados=JSON.parse(localStorage.getItem('resultado')!)||[];
    //localStorage.getItem('historial');
    // if(localStorage.getItem('historial')){
    //   this._historial=JSON.parse(localStorage.getItem('historial')!);
    // }
  }
  
  
  
  buscarGifs(query:string=''){
    
    query= query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial))
    }

    const params= new HttpParams()
              .set('api_key',this.apiKey)
              .set('limit','10')
              .set('q',query)
    // console.log(params.toString())
    this.http.get<SearchGiftsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp:SearchGiftsResponse)=>{
        // console.log(resp.data)
        
        this.resultados=resp.data;
        // resp.data[0].images.downsized_medium.url
        localStorage.setItem('resultado',JSON.stringify(this.resultados))
      })
      

  }

  
}
