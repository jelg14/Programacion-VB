import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, switchMap, timeout, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private accessToken:string  = '';
  // HTTP: Hypertext Transfer Protocol
  // HTTPS: Hypertext Transfer Protocol Secure -- encriptado SSL TLS
  // GET request == obtener datos
  // POST request == enviar datos
  // PUT request == actualizar datos (completo)
  // PATCH request == actualizar datos (parcial)
  // DELETE request == eliminar datos
  constructor(private http:HttpClient) {
    this.getBearerToken().subscribe((token) => {
      this.accessToken = token;
    });
  }
  getQuery(query: string): Observable<any> {
    /* se cambio el metodo subscribe por pipe y switchmap, debido a que
     * subscribe NO DEVUELVE NINGUN VALOR, pipe si permite utilizar operadores que
     * para actualizar datos, como switchMap, el cual cancela solicitudes http en curso
     * y comienza un nueva solicitud para obtener un token */
    return this.getBearerToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.get('https://api.spotify.com/v1/' + query, { headers });
      })
    );
  }

  getCategorieDinner(): Observable<any> {
    return this.getQuery('browse/categories/dinner/playlists');
  }

  getArtist2(): Observable<any> {
    return this.getQuery('artists/0TnOYISbd1XYRBk9myaseg');
  }
  getNewReleases(): Observable<any> {
    return this.getQuery('browse/new-releases?limit=25')
  }
  getCaterogies(){
    return this.getQuery('browse/categories?limit=25')
  }
  getArtists(termino: string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
  }
  getArtist(id: string){
    return this.getQuery(`artists/${id}`)
  }
  getTopTracks(id: string){
    return this.getQuery(`artists/${id}/top-tracks`)
  }
  getBearerToken(){
    const url = 'https://accounts.spotify.com/api/token';
    const body = new URLSearchParams();
    body.set('grant_type','client_credentials');
    body.set('client_id','a35ee6c8d3044eb89cac08eb1bc00889');
    body.set('client_secret','4ceed109c4d84e258b0fa408acd9ef2f');
    const options = {
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencoded'
      })
    };
    //POST request
    return this.http.post(url,body.toString(),options).pipe(
        map((resp:any) => {
        this.accessToken = resp.access_token;
        return resp.access_token;
      })
    )
  }

}
// DOM document object model
