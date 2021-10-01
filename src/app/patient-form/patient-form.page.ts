import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Pacient } from '../models/Pacient';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.page.html',
  styleUrls: ['./patient-form.page.scss'],
})
export class PatientFormPage implements OnInit {
pacient = {} as Pacient;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,    
    private firestore: AngularFirestore,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }
  async register_patient(pacient : Pacient){    
    if (this.formValidation()){
      let loader = this.loadingCtrl.create({
        message:"Por favor esperar ...."
      }) ;
      (await loader).present();
      try{
        //this.pacient.tracking=[];
        this.firestore.collection("Paciente").add(this.pacient);
      }catch(e){
        this.showToast(e);
      }
      (await loader).dismiss();
      this.navCtrl.navigateRoot("home");
    }
   
      //this.navCtrl.navigateRoot("/home");
  }
  formValidation(){
    if(!this.pacient.first_name ) {
      this.showToast("Ingresar Nombre");
      return false;
    }
    if(!this.pacient.last_name ) {
      this.showToast("Ingresar Horario");
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
