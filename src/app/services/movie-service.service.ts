import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieDBResponse } from '../public/models/movieDBResponse';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }

  private UrlServiceV1: string = environment.movieDB.apiBaseUrl 
    + environment.movieDB.apiKeyArg 
    + environment.movieDB.langArg
    + environment.movieDB.pageArg;

  public getUpcomingMovies() : Observable<MovieDBResponse> {
    return this.http
    .get<MovieDBResponse>(this.UrlServiceV1);
  }

}
