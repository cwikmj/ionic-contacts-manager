import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingCtrl: LoadingController) { }

  async present() {
    await this.dismiss();
    await this.loadingCtrl.create({
      cssClass: 'login-loader',
      message: 'please wait...',
      spinner: 'crescent',
      backdropDismiss: false,
    }).then(res => {
      res.present();
    });
  }

  async dismiss() {
    while (await this.loadingCtrl.getTop() !== undefined) {
      await this.loadingCtrl.dismiss()
    }
  }
}
