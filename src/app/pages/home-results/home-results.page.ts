import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';
import { OnInit } from '@angular/core';
import { HttpService } from '../../services/http/httpservice.service';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})

export class HomeResultsPage implements OnInit {
  searchKey = '';
  weight_goal = 'XX.X';
  public today_intake;
  public today_consume;
  public today_total;
  weightChart: Chart;
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';

  calorie_url = "http://ec2-13-115-231-20.ap-northeast-1.compute.amazonaws.com/calories";
  intake_url = "http://ec2-13-115-231-20.ap-northeast-1.compute.amazonaws.com/intake";

  @ViewChild('chartContainer') chartcontainer: ElementRef;
  @ViewChild('chartcanvas') chartcanvas: ElementRef;

  // ngAfterViewInit(){
  //   this.createWeightChart();
  // }

  ngOnInit() {
    this.get();
    console.log(this.today_consume);
    console.log(this.today_intake);
  }

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public http: HttpService
  ) {

  }

  async get() {
    return this.http.get(this.calorie_url)
    .then(res => { this.today_intake = res['intake'];
                    this.today_consume = res['consume'];
                    this.today_total = this.today_intake - this.today_consume;
                    console.log(res);
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
}
