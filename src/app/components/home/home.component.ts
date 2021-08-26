import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    firstName: [''],
    lastName: [''],
    cpf: [''],
    birthDate: [''],
    email: [''],
    companionFirstName: [{ value: '', disabled: true }],
    companionLastName: [{ value: '', disabled: true }],
    companionCpf: [{ value: '', disabled: true }],
    companionBirthDate: [{ value: '', disabled: true }],
    companionEmail: [{ value: '', disabled: true }],
    cep: [''],
    address: [],
    hasAc: [false],
    movie: ['']
  });

  addressForm = this.fb.group({
    logradouro: [''],
    complemento: [''],
    bairro: [''],
    localidade: [''],
    uf: [''],
    ibge: [''],
    gia: [''],
    ddd: [''],
    siafi: [''],
    cep: [''],
    numero: ['']
  })

  movieForm = this.fb.group({
    title: ['']
  })

  constructor(private fb: FormBuilder, private cepService: CepService, private movieService: MovieService) { }

  public movieList: Movie[] = [];
  public loadingMovieList: boolean;

  ngOnInit() {
    this.onChanges();
  }

  public onChanges(): void {
    this.addressForm.valueChanges
      .subscribe(res => {
        console.log('overloads: ', res)
      });
  }

  public showCompanion() {
    console.log("showing companion data");
  }

  public onSubmit() {
    console.log('form data is ', this.profileForm.value);

    this.profileForm.patchValue({
      address: this.addressForm.value,
    });
  }

  public searchCep() {
    this.cepService.setCep(this.addressForm.value.cep);

    this.cepService.getAddress()
      .subscribe(res => {
        console.log(res);

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
}
