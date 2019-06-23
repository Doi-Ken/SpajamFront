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

  ngAfterViewInit(){
    this.createWeightChart();
  }

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

  notifications(){
    this.get();
    console.log(this.today_consume);
    console.log(this.today_intake);
  }

  createWeightChart(){
    this.weightChart = new Chart(this.chartcanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3]
          // backgroundColor: [
          //   'rgba(255, 99, 132, 0.2)',
          //   'rgba(54, 162, 235, 0.2)',
          //   'rgba(255, 206, 86, 0.2)',
          //   'rgba(75, 192, 192, 0.2)',
          //   'rgba(153, 102, 255, 0.2)',
          //   'rgba(255, 159, 64, 0.2)'
          // ],
          // borderColor: [
          //   'rgba(255,99,132,1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          // borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  }

  // async alertLocation() {
  //   const changeLocation = await this.alertCtrl.create({
  //     header: 'Change Location',
  //     message: 'Type your Address.',
  //     inputs: [
  //       {
  //         name: 'location',
  //         placeholder: 'Enter your new Location',
  //         type: 'text'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Change',
  //         handler: async (data) => {
  //           console.log('Change clicked', data);
  //           this.yourLocation = data.location;
  //           const toast = await this.toastCtrl.create({
  //             message: 'Location was change successfully',
  //             duration: 3000,
  //             position: 'top',
  //             closeButtonText: 'OK',
  //             showCloseButton: true
  //           });

  //           toast.present();
  //         }
  //       }
  //     ]
  //   });
  //   changeLocation.present();
  // }

  // async searchFilter () {
  //   const modal = await this.modalCtrl.create({
  //     component: SearchFilterPage
  //   });
  //   return await modal.present();
  // }

  // async presentImage(image: any) {
  //   const modal = await this.modalCtrl.create({
  //     component: ImagePage,
  //     componentProps: { value: image }
  //   });
  //   return await modal.present();
  // }


  // ここ何故かエラー出る※※
  // async notifications(ev: any) {
  //   const popover = await this.popoverCtrl.create({
  //     component: NotificationsComponent,
  //     event: ev,
  //     animated: true,
  //     showBackdrop: true
  //   });
  //   return await popover.present();
  // }


