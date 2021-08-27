import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-buyer-form',
  templateUrl: './buyer-form.component.html',
  styleUrls: ['./buyer-form.component.scss']
})
export class BuyerFormComponent implements OnInit {

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cpf: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', Validators.required],
    cep: ['', Validators.required],
    address: [],
    hasAc: [false],
    movie: ['']
  });

  companionForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cpf: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
