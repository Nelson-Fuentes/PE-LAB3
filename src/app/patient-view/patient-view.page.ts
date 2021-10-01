import { Component, OnInit } from '@angular/core';
import { Pacient } from '../models/Pacient';
import { Tracking } from '../models/Tracking';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.page.html',
  styleUrls: ['./patient-view.page.scss'],
})
export class PatientViewPage implements OnInit {
  code:string;
  pat_aux = {} as Pacient;
  track_aux : Tracking [] ;

  public patient: Pacient = new Pacient(
    'Summers', 'Scott', '1963-09-01', 1.8, 'Wetchester', 39.8755,-75.6710, 0, [

    ]
  )

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private location: Location,
    private rout: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,

  ) { }

  ngOnInit() {
//    this.code =  this.rout.snapshot.params.get('id');
    this.code = this.rout.snapshot.paramMap.get('id');
    //console.log(this.rout.snapshot.paramMap.get('id'));
    this.getPost();
  }

  async getPost(){
    try{
      this.firestore
      .collection("Paciente")
      .doc(this.code)
      .snapshotChanges().subscribe( data =>{
        this.patient.last_name = data.payload.data()['last_name'],
        this.patient.first_name = data.payload.data()['first_name'],
        this.patient.date_birth = data.payload.data()['date_birth'],
        this.patient.stature = data.payload.data()['stature'],
        this.patient.address = data.payload.data()['address'],
        this.patient.latitude = data.payload.data()['latitude'],
        this.patient.longitude = data.payload.data()['longitude']
      });    

      this.firestore
      .collection("Paciente")
      .doc(this.code)
      .collection("tracking")
      .snapshotChanges()
      .subscribe( dat => {
        this.track_aux = dat.map( e => {
            return {
              id: e.payload.doc.id,
              date: e.payload.doc.data()["date"],
              weigth: e.payload.doc.data()["weigth"],
              temperature: e.payload.doc.data()["temperature"],
              presion: e.payload.doc.data()["presion"],
              saturation : e.payload.doc.data()["saturacion"]
            };
        });
      });      
    }catch(e){

    }

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

  async save(){
    this.pat_aux.first_name = this.patient.first_name;
    this.pat_aux.last_name =  this.patient.last_name;    
    this.pat_aux.date_birth = this.patient.date_birth;
    this.pat_aux.stature = this.patient.stature;
    this.pat_aux.address = this.patient.address;
    this.pat_aux.latitude = this.patient.latitude;
    this.pat_aux.longitude = this.patient.longitude;
    this.pat_aux.tracking = this.patient.tracking;

    this.firestore.collection("Paciente").doc(this.code).update(this.pat_aux);
    //this.router.navigate(['/home']);
    this.navCtrl.navigateRoot("/home");
  }

  delete(){
    try{
      this.firestore
      .collection("Paciente")
      .doc(this.code).delete()
    }catch(e){
      this.showToast(e);
    }
    this.location.back();
  }

  create_track(){
    this.router.navigate(['/track-form',this.code]);
  }
  showToast(message: string ){
    this.toastCtrl
    .create({
      message:message,
      duration:3000
    })
    .then(toastData => toastData.present());
  }

}
