import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Movie } from 'src/app/public/models/movie';
import { MovieService } from 'src/app/services/movie-service.service';
import { ReservaService } from 'src/app/services/reserva.service';
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

  constructor(private fb: FormBuilder, private movieService: MovieService, private reservaService: ReservaService) { }

  public loadingMovieList: boolean;
  public loadingMoviePoster: boolean;

  public selectedMovieTitle: string;
  public movieList: Movie[] = [];
  public movieReleaseDate: Date;

  public imageUrl: string;
  public imageToShow: any;
  public isFormValid = false;

  public addressForm: FormGroup;
  public buyerForm: any;

  public submitPayload: any;

  public ticketPrice = 0;
  public shippingPrice = 0.0;
  public totalPrice = 0.0;
  public shippingDisabled = true;
  public showMovieRelease = false;

  ngOnInit() {
    this.onChanges();
    this.getMovieList();
  }

  public onChanges(): void {

    this.movieForm.valueChanges
      .subscribe(res => {
        this.selectedMovieTitle = res.info.title;
        this.imageUrl = environment.movieDB.apiImageUrl + res.info.poster_path;
        this.movieReleaseDate = new Date(res.info.release_date);
        this.showMovieRelease = true;
        this.ticketPrice = 32;
        this.getMoviePoster();
        this.validateRequiredFields();
        this.totalPrice = this.ticketPrice;
        this.shippingDisabled = false;
        this.shippingPrice = 7.90;
        this.totalPrice = this.shippingPrice + this.ticketPrice;
      });
  }

  public onSubmit() {
    let payload = this.getRequestPayload();

    if (this.movieForm.valid) {
      this.isFormValid = true;
      console.log('pressed submit');
      console.log('payload: ', payload);
      
      this.reservaService.postReserva(payload)
        .subscribe()
    }
  }

  public getRequestPayload(): any {
    let payload = {
      clientInfo: this.buyerForm.profileForm.value,
      addressInfo: this.addressForm.value,
      price: this.totalPrice
    };

    return payload;
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

  public getMovieReleaseDate(): Date {
    return new Date();
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

  public validateRequiredFields(): void {
    if (this.buyerForm != undefined && this.addressForm != undefined) {
      this.isFormValid = this.isAddressFormValid() && this.isBuyerFormValid();
    }
  }

  public isBuyerFormValid(): boolean {
    if (!this.buyerForm.profileForm.value.hasAc) {
      return this.buyerForm.profileForm.valid;
    } else {
      return this.buyerForm.profileForm.valid && this.buyerForm.companionForm.valid;;
    }
  }

  public isAddressFormValid(): boolean {
    return this.addressForm.valid;
  }

  public receiveDataFromAddressForm(data: any) {
    this.addressForm = data;
  }

  public receiveDataFromBuyerForm(data: any) {
    this.buyerForm = data;
  }

  public converteData(date: Date): string {
    return date.getDate().toString() + "/"
     + (date.getMonth() + 1).toString() + "/" // mês errado se não adicionar 1
    + date.getFullYear().toString();
  }

}
