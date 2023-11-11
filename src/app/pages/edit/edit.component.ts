import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from 'src/app/services/contacts.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditComponent implements OnInit {
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phoneRegex = /^\d{9}$/;
  isValid = {
    name: true,
    email: true,
    phone: true,
  }
  contact: any;
  id: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.contact = this.contactService.getContactById(this.id)
    this.contact.phone = this.contact.phone.replace(/-/g, "");
  }

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

  updateContact() {
    this.loaderService.present();
    this.contact.phone = this.contact.phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
    this.contactService.updateContact(this.contact);
    this.contactService.sortContacts()
    setTimeout(() => {
      this.loaderService.dismiss();
      this.router.navigate(['/contacts']);
    }, 200);
  }
}
