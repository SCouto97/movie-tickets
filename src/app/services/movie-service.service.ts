import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieDBResponse } from '../public/models/movieDBResponse';
import { Movie } from '../public/models/movie';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }

  private UrlServiceV1: string = environment.movieDB.apiBaseUrl
    + environment.movieDB.apiKeyArg
    + environment.movieDB.langArg
    + environment.movieDB.pageArg;

  private movieList: Movie[];

  public getMovieDBResponse(): Observable<MovieDBResponse> {
    return this.http
      .get<MovieDBResponse>(this.UrlServiceV1);
  }


  public getUpcomingMovies(): Movie[] {
    console.log(this.movieList);
    return this.movieList;
  }

}
