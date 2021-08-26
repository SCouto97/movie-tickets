import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  addressForm = this.fb.group({
    cep: ['', Validators.required],
    logradouro: ['', Validators.required],
    uf: ['', Validators.required],
    localidade: ['', Validators.required],
    bairro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: ['']
  })


  constructor(private fb: FormBuilder, private cepService: CepService) { }

  ngOnInit(): void {
    this.onChanges();
  }

  public onChanges(): void {
    this.addressForm.valueChanges
      .subscribe(res => {
        console.log('overloads: ', res);
      });
  }

  public searchAddressByCep() {
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

}
