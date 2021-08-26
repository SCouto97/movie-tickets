import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';

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
    hasAc: [false]
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
    cep: ['']
  })

  constructor(private fb: FormBuilder, private cepService: CepService) { }

  ngOnInit() {
    this.onChanges();
  }

  public onChanges(): void {
    // this.profileForm.valueChanges
    //   .subscribe(res => {
    //     console.log('profileForm: ', res)
    //   });

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
    })

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


        });
      });
  }

}
