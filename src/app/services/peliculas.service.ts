import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { apiKey } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = apiKey.key;
  constructor(private http: HttpClient) { 
  }
  traerPeliculasMarvel(page:number) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('vote_count.gte', '200')
      .set('with_companies', '420')
      .set('sort_by', 'vote_count.desc')
      .set('primary_release_date.gte', '2011-01-01')
      .set('primary_release_date.lte', '2023-12-12')
      .set('language', 'es')
      .set('page', page.toString());
    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }

}
