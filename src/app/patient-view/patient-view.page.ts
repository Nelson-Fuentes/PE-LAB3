import { Component, OnInit } from '@angular/core';
import { Pacient } from '../models/Pacient';
import {NavController} from '@ionic/angular';
import { Tracking } from '../models/Tracking';
import { Router } from '@angular/router';
import { Location } from "@angular/common";


@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.page.html',
  styleUrls: ['./patient-view.page.scss'],
})
export class PatientViewPage implements OnInit {
  
  public patient: Pacient = new Pacient(
    'Summers', 'Scott', '1963-09-01', 1.8, 'Wetchester', 39.8755,-75.6710, 0, [
      new Tracking(new Date('2021-09-29'), 70, 36, 85, 15),
      new Tracking(new Date('2021-09-28'), 71, 35, 90, 16),
      new Tracking(new Date('2021-09-26'), 68, 34, 100, 17),
      new Tracking(new Date('2021-09-23'), 72, 36, 100, 18),
      new Tracking(new Date('2021-09-19'), 64, 33, 99, 19),
      new Tracking(new Date('2021-09-14'), 74, 32, 98, 20),
      new Tracking(new Date('2021-09-08'), 60, 35, 97, 21),
      new Tracking(new Date('2021-09-01'), 50, 36, 96, 22),
      new Tracking(new Date('2021-08-24'), 75, 37, 95, 23),
      new Tracking(new Date('2021-08-16'), 48, 38, 90, 24)
    ]
  )
    
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private location: Location
  ) { }

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

  save(){
    /*
    edit process
    */
  }

  delete(){
    /**
     * delete process
     */
    this.location.back();
  }

  create_track(){
    this.router.navigate(['/track-form']);
  }

}
