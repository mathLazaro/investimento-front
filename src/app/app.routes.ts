import { Routes } from '@angular/router';
import { ListAppComponent } from './components/list-app/list-app.component';
import { CreateAppComponent } from './components/create-app/create-app.component';

export const routes: Routes = [
  { path: "list", component: ListAppComponent },
  { path: "create", component: CreateAppComponent }
];
