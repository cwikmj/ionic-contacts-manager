import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contacts.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddComponent {
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex = /^\d{9}$/;
  isValid = {
    name: true,
    email: true,
    phone: true,
  }
  contact: Contact = {
    id: '',
    name: '',
    email: '',
    phone: ''
  };

  constructor(
    private contactService: ContactService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  onInput(field: string) {
    if (field === 'name' && this.contact.name.length < 5) {
      this.isValid.name = false;
    } else {
      this.isValid.name = true;
    }
    if (field === 'email' && this.emailRegex.test(this.contact.email) === false) {
      this.isValid.email = false;
    } else {
      this.isValid.email = true;
    }
    if (field === 'phone' && this.phoneRegex.test(this.contact.phone) === false) {
      this.isValid.phone = false;
    } else {
      this.isValid.phone = true;
    }
  }

  saveContact(): void {
    this.loaderService.present();
    this.contact.id = this.contactService.generateId();
    this.contact.phone = this.contact.phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
    this.contactService.addContact(this.contact);
    this.contactService.sortContacts()
    setTimeout(() => {
      this.loaderService.dismiss();
      this.router.navigate(['/contacts']);
    }, 200);
  }
}
