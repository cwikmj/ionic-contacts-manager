import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'contacts/add',
    loadComponent: () => import('./pages/add/add.component').then(m => m.AddComponent)
  },
  {
    path: 'contacts/edit/:id',
    loadComponent: () => import('./pages/edit/edit.component').then(m => m.EditComponent)
  },
  {
    path: '**', redirectTo: '/not-found'
  },
  {
    path: 'not-found',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
