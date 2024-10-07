import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartasService {
  private apiUrl = 'https://deckofcardsapi.com/api/deck';
  http = inject(HttpClient);
  constructor() { }

  crearBaraja(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/new/shuffle/?deck_count=1`);
  }

  drawCards(deckId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${deckId}/draw/?count=52`);
  }
}
