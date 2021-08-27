import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Output() changeAdressFormEvent = new EventEmitter<any>();

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

  public sentDataFormAddress(): void {
    this.changeAdressFormEvent.emit(this.addressForm.value);
  }

  public onChanges(): void {
    this.addressForm.valueChanges
      .subscribe(res => {
        this.sentDataFormAddress();
        console.log('overloads: ', res);
      });
  }

  f() {
    console.log('@@@: ', this.addressForm.invalid);
    // return this.addressForm.is;
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
