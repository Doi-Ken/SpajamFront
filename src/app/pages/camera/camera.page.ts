import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss']
})
export class CameraPage implements OnInit {

  imgSrc: string;

constructor( private camera: Camera ) {
}
ngOnInit() {
}

ionViewDidLoad() {
  console.log('ionViewDidLoad CameraPage');
}

takePicture(){
  const options: CameraOptions = {
    quality: 75,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  this.camera
    .getPicture(options)
    .then((imageData)=>{
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgSrc = base64Image;
    })
    .catch((err)=>{
      console.log(err);
    });
  }

}
