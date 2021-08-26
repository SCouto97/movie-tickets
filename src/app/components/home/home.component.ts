import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Movie } from 'src/app/public/models/movie';
import { CepService } from 'src/app/services/cep.service';
import { MovieService } from 'src/app/services/movie-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cpf: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', Validators.required],
    cep: ['', Validators.required],
    address: [],
    hasAc: [ false ],
    movie: ['']
  });

  companionForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cpf: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', Validators.required],
  });

  addressForm = this.fb.group({
    cep: ['', Validators.required],
    logradouro: ['', Validators.required],
    uf: ['', Validators.required],
    localidade: ['', Validators.required],
    bairro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: ['']
  })

  movieForm = this.fb.group({
    title: [''],

  })

  constructor(private fb: FormBuilder, private cepService: CepService, private movieService: MovieService) { }

  public movieList: Movie[] = [];
  public loadingMovieList: boolean;

  ngOnInit() {
    this.onChanges();
    this.getMovieList();
  }

  public onChanges(): void {
    this.addressForm.valueChanges
      .subscribe(res => {
        console.log('overloads: ', res);
      });
  }

  public onSubmit() {
    console.log('form data is ', this.profileForm.value);

    this.profileForm.patchValue({
      address: this.addressForm.value,
    });

    console.log('movieForm:', this.movieForm.value);
  }

  public searchCep() {
    this.cepService.setCep(this.addressForm.value.cep);

    this.cepService.getAddress()
      .subscribe(res => {
        this.addressForm.patchValue({
          logradouro: res.logradouro,
          bairro: res.bairro,
          localidade: res.localidade,
          uf: res.uf,
        });
      });
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
    console.log(this.movieList);
  }

  public activeFields() {
    if (this.profileForm.value.hasAc) {
      // this.profileForm.controls.companionFirstName.enable();
    }
  }

}
