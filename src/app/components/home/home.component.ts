import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Movie } from 'src/app/public/models/movie';
import { MovieService } from 'src/app/services/movie-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movieForm = this.fb.group({
    info: [''],
  })

  constructor(private fb: FormBuilder, private movieService: MovieService) { }

  public movieList: Movie[] = [];
  public loadingMovieList: boolean;
  public loadingMoviePoster: boolean;
  public imageUrl: string;
  public imageToShow: any;
  public selectedMovieTitle: string;
  public isFormValid = false;

  ngOnInit() {
    this.onChanges();
    this.getMovieList();
  }

  public onChanges(): void {

    this.movieForm.valueChanges
      .subscribe(res => {
        this.selectedMovieTitle = res.info.title;
        this.imageUrl = environment.movieDB.apiImageUrl + res.info.poster_path;
        this.getMoviePoster();
      });
  }

  public onSubmit() {

    if (this.movieForm.valid) {

      this.isFormValid = true;
      // console.log('form data is: ', this.profileForm.value);
      // console.log('companion form is: ', this.companionForm.value);
      // console.log('address data is: ', this.addressForm.value)
      console.log('movieForm:', this.movieForm.value);
    }

  }

  public getMovieList(): void {
    this.loadingMovieList = true;
    this.movieService.getMovieDBResponse()
      .subscribe(
        movieDBResponse => {
          movieDBResponse.results.forEach(movie => {
            this.movieList.push(movie);
          });
          this.loadingMovieList = false;
        },
        error => {
          console.log(error);
          this.loadingMovieList = false;
        }
      );
  }

  public createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public getMoviePoster(): void {
    this.loadingMoviePoster = true;
    this.movieService.getImage(this.imageUrl).subscribe(data => {
      this.createImageFromBlob(data);
      this.loadingMoviePoster = false;
    }, error => {
      this.loadingMoviePoster = false;
      console.log(error);
    });
  }

  public updateMovieChoice(): void {
    this.movieForm.patchValue({
      title: this.movieForm.value.title
    });
  }

  public validateRequiredFields(): boolean {
    return true;
  }
}
