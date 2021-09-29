import { Component, OnInit } from '@angular/core';
import { Pacient } from '../models/Pacient';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.page.html',
  styleUrls: ['./patient-view.page.scss'],
})
export class PatientViewPage implements OnInit {
  
  public patient: Pacient = new Pacient(
    'Summers', 'Scott', '1963-09-01', 1.8, 'Wetchester', 39.8755,-75.6710, 0
  )
    
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goToNextPage(){
    let marker=[{
      title: `Casa de Pedro`,
      latitude: this.patient.latitude,
      longitude: this.patient.longitude
    }/*,{
      title: "Casa de Pepe",
      latitude:-16.400067,
      longitude:-71.538390
    }*/
  ];

    this.navCtrl.navigateForward(['map',
    {
      data: JSON.stringify(marker)
    }
  ]);
  }

}
