import { Component, OnInit } from '@angular/core';
import { Pacient } from '../models/Pacient';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.page.html',
  styleUrls: ['./patient-view.page.scss'],
})
export class PatientViewPage implements OnInit {
  
  public patient: Pacient = new Pacient(
    'Summers', 'Scott', '1963-09-01', 1.8, 'Wetchester', 39.8755,-75.6710, 0
  )
    
  constructor() { }

  ngOnInit() {
  }

}
