import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/public/models/movie';
import { MovieService } from '../../services/movie-service.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
})
export class ListMoviesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  public movies: Movie[] = [];

  ngOnInit(): void {
    this.movieService.getUpcomingMovies()
      .subscribe(
        movies => {
          this.movies = movies.results;
          console.log(this.movies);
        },
        error => console.log(error)
      );
  }

}
