import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieDBResponse } from '../public/models/movieDBResponse';
import { Movie } from '../public/models/movie';

@Injectable()
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  private UrlServiceV1: string = environment.movieDB.apiBaseUrl
    + environment.movieDB.apiKeyArg
    + environment.movieDB.langArg
    + environment.movieDB.pageArg;

  private movieList: Movie[];
  private imageToShow: any;

  public getMovieDBResponse(): Observable<MovieDBResponse> {
    return this.httpClient
      .get<MovieDBResponse>(this.UrlServiceV1);
  }


  public getUpcomingMovies(): Movie[] {
    console.log(this.movieList);
    return this.movieList;
  }

  public getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(imageUrl, { responseType: 'blob' });
  }

  public getMoviePoster(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      console.log('url: ', image)
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
