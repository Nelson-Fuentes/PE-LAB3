import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.page.html',
  styleUrls: ['./patient-form.page.scss'],
})
export class PatientFormPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  register_patient(){
    /*
    Proceso para registrar paciente
    */
    this.router.navigate(['/home'])
  }

}
