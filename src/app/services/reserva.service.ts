import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private httpClient: HttpClient) { }

  private reservaUrl = "http://localhost:4200/reserva";
  public reservaResponse: any;

  public postReserva(payload: any): Observable<any> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', environment.reserva.authHash)
    };

    return this.httpClient.post<any>(this.reservaUrl, { payload: payload }, header);
  }

}
