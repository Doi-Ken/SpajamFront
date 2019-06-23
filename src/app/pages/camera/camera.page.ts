import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http/httpservice.service';
import { stringify } from '@angular/core/src/util';
import { data } from './data';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss']
})
export class CameraPage implements OnInit {

  imgSrc: string;
  files: FileList;
  intake_url = "http://ec2-13-115-231-20.ap-northeast-1.compute.amazonaws.com/intake";

  public calories_response;

constructor( private camera: Camera,
  private http: HttpService,
  private jsondata: data ) {
}
ngOnInit() {
}

ionViewDidLoad() {
  console.log('ionViewDidLoad CameraPage');
}

takePicture(){
  const options: CameraOptions = {
    quality: 75,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  this.camera
    .getPicture(options)
    .then((imageData)=>{
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgSrc = base64Image;
      this.files[0] = imageData;
    })
    .catch((err)=>{
      console.log(err);
    });


  
  }

  submit() {

    this.multipartPost();
    console.log(this.calories_response);
  }

  async multipartPost() {
    this.calories_response = await this.http.post(this.intake_url, JSON.stringify(this.jsondata));
  }

}
