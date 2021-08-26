import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Address } from '../public/models/address';


@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  private cep: string;
  private UrlServiceV1: string;

  public setCep(cep: string): void { 
    this.cep = cep;
  }

  public getAddress(): Observable<Address> {
    this.UrlServiceV1 = environment.viaCep.apiBaseUrl + this.cep + environment.viaCep.apiSuffix;

    return this.http
      .get<Address>(this.UrlServiceV1);
  }

}
