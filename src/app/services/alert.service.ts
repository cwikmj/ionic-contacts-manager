import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ContactService } from './contacts.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController,
    private contactService: ContactService
  ) { }

  async presentAlert(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Do you wish to delete this ZenContact?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.alertController.dismiss()
          }
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.contactService.deleteContact(id);
          }
        }
      ],
    });

    await alert.present();
  }

}
