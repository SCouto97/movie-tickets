import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-buyer-form',
  templateUrl: './buyer-form.component.html',
  styleUrls: ['./buyer-form.component.scss']
})
export class BuyerFormComponent implements OnInit {

  @Output() changeBuyerFormEvent = new EventEmitter<any>();

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cpf: ['', Validators.required],
    birthDate: ['', Validators.required],
    email: ['', Validators.required],
    hasAc: [false]
  });

  companionForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cpf: ['', Validators.required],
    birthDate: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.onChanges();
  }

  public onChanges(): void {
    this.profileForm.valueChanges
      .subscribe(() => {
        this.sendBuyerDataFormData();
      });

    this.companionForm.valueChanges
      .subscribe(() => {
        this.sendBuyerDataFormData();
      });
  }

  public sendBuyerDataFormData(): void {

    this.changeBuyerFormEvent.emit({
      profileForm: this.profileForm,
      companionForm: this.companionForm
    });
  }
}
