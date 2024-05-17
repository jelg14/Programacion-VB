import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, timer, map, of } from 'rxjs';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: "root"
})

export class ServiceService {
  private accessToken:string = '';
  private expireIn:number =0;
  private tokenExpirationTimer:any;
  private tokenObtainAt:any;

  constructor(private http:HttpClient) {
    console.log('Service Service Constructor');
  }
  getQuery (query:string){
    const url = `https://api.spotify.com/v1/${query}`;
    return this.getBearerToken().pipe(
      switchMap(token=>{
        const headers = new HttpHeaders({
          'Authorization':'Bearer'+token
        });
      return this.http.get(url,{headers});
    }));
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit-25')
  }

  getCategories(){
    return this.getQuery('browse/categories?limit=25')
  }

  getArtists(){
    return this.getQuery(`search?q=genre:rock&type=artist&limit=10`)
  }

  getArtist(id:string){
    return this.getQuery(`artists/${id}`)
  }

  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
  }

  getBearerToken(){
    if (this.accessToken && !this.IsTokenExpired) {
      return of(this.accessToken);
    }
    const url = 'https://accounts.spotify.com/api/token'
    const body = new URLSearchParams();
    body.set('grant_type','client_credentials');
    body.set('client_id','');
    body.set('client_secret','');
    const options={
      headers: new HttpHeaders({
        'Content-Type':'application/x-www-form-urlencode'
      })
    };
    return this.http.post(url,body.toString(),options).pipe(
      map((resp:any)=>{
        console.log('Token',resp)
        this.accessToken = resp.access_token;
        this.expireIn = resp.expire_in;
        this.tokenObtainAt = new Date();
        this.startTokenTimer();
        return resp.access_token;
      })
    )
  }

  IsTokenExpired(){
    const currentTime = new Date();
    const timeElapsed = (currentTime.getTime()-this.tokenObtainAt.getTime())/1000;
    console.log(`tiempo transcurrido`,timeElapsed)
    return this.expireIn - timeElapsed<10;
  }
  
  private startTokenTimer(){
    const timeout = this.expireIn - 10;
    console.log ('Token Timer',timeout)
    this.tokenExpirationTimer = timer(timeout*1000).pipe(
      switchMap(()=> {return this.getBearerToken();})
    ).subscribe();
  }
}
