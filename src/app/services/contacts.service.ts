import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  constructor() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
    }
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContactById(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  generateId(): string {
    return Math.random().toString().substring(2,14)
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
    this.saveContacts();
  }

  updateContact(contact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = contact;
      this.saveContacts();
    }
  }

  deleteContact(id: string): void {
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.saveContacts();
    }
  }

  sortContacts(): void {
    this.contacts = this.contacts.sort((a, b) => a.name.localeCompare(b.name));
  }

  generateRandomUser(): Contact {
    const names = ["John", "Jane", "David", "Emily", "Michael", "Olivia", "Alex", "Emma", "Daniel", "Sophia"];
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Penn", "Scott", "Barnes", "Baker"];
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const phoneFormat = "###-###-###"

    const randomIndex = Math.floor(Math.random() * names.length);
    const randomName = names[randomIndex];
    const randomLastName = lastNames[randomIndex];
    const randomEmail = `${randomName.toLowerCase()}.${randomLastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const randomPhoneNumber = phoneFormat.replace(/#/g, () => Math.floor(Math.random() * 10).toString());

    return {
      id: this.generateId(),
      name: `${randomName} ${randomLastName}`,
      email: randomEmail,
      phone: randomPhoneNumber
    };
  }

  private saveContacts(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}
