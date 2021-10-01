import { Component, OnInit } from '@angular/core';
import { Pacient } from '../models/Pacient';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Tracking } from '../models/Tracking';
import { collection, query, where } from "firebase/firestore";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pacients: any;
/*
  public pacients: Pacient[] = [
    new Pacient(
      'Summers', 'Scott', '1963-09-01', 1.8, 'Wetchester', 39.8755,-75.6710, 0
    ),
    new Pacient(
      'Grey', 'Jean', '1963-09-01', 1.8, 'Wetchester', 43.6534,-87.7282, 1
    ),    new Pacient(
      'MacCoy', 'Henry', '1963-09-01', 1.8, 'Wetchester', 35.2702,136.9892, 2
    ),
    new Pacient(
      'Drake', 'Robert', '1963-09-01', 1.8, 'Wetchester', 35.6727,139.6950, 3
    ),
    new Pacient(
      'Worthington', 'Warren', '1963-09-01', 1.8, 'Wetchester', -2.103767,-79.902837, 4
    )
  ];
  */ 
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore
  ) { 
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.getPost();
  }
  async getPost(){
    let loader = this.loadingCtrl.create({
      message:"Por favor esperar ...."
    }) ;
    (await loader).present();
    try{
      this.firestore
      .collection("Paciente")
      .snapshotChanges()
      .subscribe(data => {
        this.pacients = data .map( e => {
           return{
             id: e.payload.doc.id,
             last_name: e.payload.doc.data()["last_name"],
             first_name: e.payload.doc.data()["first_name"],
             date_birth: e.payload.doc.data()["date_birth"],
             stature: e.payload.doc.data()["stature"],
             address: e.payload.doc.data()["address"],
             latitude: e.payload.doc.data()["latitude"],
             longitude: e.payload.doc.data()["longitude"]              
           };
        });
      });
      (await loader ).dismiss();
    }catch(e){
      this.showToast(e); 
    }
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
