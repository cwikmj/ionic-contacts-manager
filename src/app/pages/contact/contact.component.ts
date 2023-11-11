import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { AlertService } from 'src/app/services/alert.service';
import { ContactService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ContactComponent implements OnInit {
  @ViewChild(AlertService) delete: boolean = false;
  contacts: Array<Contact> = [];


  constructor(
    private contactService: ContactService,
    private alertService: AlertService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  addContact() {
    this.router.navigate(['/contacts/add']);
  }

  editContact(id: string) {
    this.router.navigate([`/contacts/edit/${id}`]);
  }

  deleteContact(id: string) {
    this.alertService.presentAlert(id);
  }
}
