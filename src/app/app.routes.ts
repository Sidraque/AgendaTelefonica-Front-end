import { Routes } from '@angular/router';
import { ContatoFormComponent } from './pages/contato-form/contato-form.component';
import { ContatoListComponent } from './pages/contato-list/contato-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/contatos', pathMatch: 'full' },
    { path: 'contatos', component: ContatoListComponent },
    { path: 'contato/novo', component: ContatoFormComponent },
    { path: 'contato/editar/:id', component: ContatoFormComponent }
];
