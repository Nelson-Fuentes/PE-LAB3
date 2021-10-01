import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Tracking } from '../models/Tracking';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pacient } from '../models/Pacient';


@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.page.html',
  styleUrls: ['./track-form.page.scss'],
})
export class TrackFormPage implements OnInit {
track = {} as Tracking;
patient = {} as Pacient;
code:string;
  constructor(
    private router: Router,
    private location: Location,
    public navCtrl: NavController,
    private rout: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.code = this.rout.snapshot.paramMap.get('id');
  }

  async save(track : Tracking){
    if (this.formValidation()){
      let loader = this.loadingCtrl.create({
        message:"Por favor esperar ...."
      }) ;
      (await loader).present();
      try{
        this.track.date = new Date();
        this.firestore
        .collection("Paciente")
        .doc(this.code)
        .collection("tracking").add(this.track)        
      }catch(e){
        this.showToast(e);
        console.log(e)
      }
      (await loader).dismiss();
      this.location.back();
    }
  }
  formValidation(){
    if(!this.track.weigth ) {
      this.showToast("Ingresar Peso");
      return false;
    }
    if(!this.track.temperature ) {
      this.showToast("Ingresar Temperatura");
      return false;
    }
    return true;

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
