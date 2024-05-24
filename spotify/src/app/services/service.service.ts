import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, switchMap, timeout, timer } from 'rxjs';
import { count } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private accessToken:string  = '';
  private expiresIn:number = 0;
  private tokenExpirationTimer:any;
  private tokenObtainedAt:any;
  // HTTP: Hypertext Transfer Protocol
  // HTTPS: Hypertext Transfer Protocol Secure -- encriptado SSL TLS
  // GET request == obtener datos
  // POST request == enviar datos
  // PUT request == actualizar datos (completo)
  // PATCH request == actualizar datos (parcial)
  // DELETE request == eliminar datos
  constructor(private http:HttpClient) {
  }
  getQuery(query: string): Observable<any>{

        const headers = new HttpHeaders({
          'Authorization':'Bearer ' + 'BQDLpSBaBLgdjsGc61AcYPnOxTYkKwbZfFGWf4XdYpxMhKUo6GglVhW3pa5YsMOmdRH8T6joCXWf9oBxTRbKH9bk1LJLU8csUog0v2PTSe1Qy8TFJCc'
        });
        return this.http.get('https://api.spotify.com/v1/'+query,{headers});

  }

  getArtist2(): Observable<any> {
    const headers = { 'Authorization': 'Bearer BQDLpSBaBLgdjsGc61AcYPnOxTYkKwbZfFGWf4XdYpxMhKUo6GglVhW3pa5YsMOmdRH8T6joCXWf9oBxTRbKH9bk1LJLU8csUog0v2PTSe1Qy8TFJCc' };
    return this.http.get('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg', { headers });
  }

  getNewReleases(): Observable<any> {
    return this.getQuery('browse/new-releases?limit=10')
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
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
  }
  getBearerToken(){
    if (this.accessToken && !this.IsTokenExpired()){
      return of(this.accessToken);
    }
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
        this.expiresIn = resp.expires_in;
        this.tokenObtainedAt = new Date();
        this.startTokenTimer();
        return resp.access_token;
      })
    )
  }
  IsTokenExpired(){
    const currentTime = new Date();
    const timeElapsed = (currentTime.getTime() - this.tokenObtainedAt.getTime()) / 1000;
    console.log('Tiempo transcurrido',timeElapsed)
    return this.expiresIn - timeElapsed < 10;
  }
  private startTokenTimer(){
    const timeout = this.expiresIn - 10;
    console.log('Token Timer',timeout)
    this.tokenExpirationTimer = timer(timeout * 1000).pipe(
      switchMap(() => { return this.getBearerToken(); })
    ).subscribe();
  }
}
// DOM document object model
