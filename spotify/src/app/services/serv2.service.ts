import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';
  //ANTES DE EJECUTAR, INGRESAR TOKEN 
  private accessToken: string = 'BQDz4mNaIHNucMniZOpy-REGIZrq3fvfl9MQNsuoiMMq6_LYiB2uONkDlnR-S2sh8bWrD7f704DoKytjIWE3t1zuZJ_qJMH_ezaJisOFYLtj7-b_rEs';  //colocar token manualmente

  constructor(private http: HttpClient) {}

  getNewReleases(): Observable<any> {
    const url = `${this.apiUrl}/browse/new-releases?limit=10`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get(url, { headers });
  }

  getArtists(): Observable<any> {
    const url = `${this.apiUrl}/search?q=genre:rock&type=artist&limit=10`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get(url, {headers});
  }
}