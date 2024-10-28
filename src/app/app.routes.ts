import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectMenuComponent } from './portfolio/project-menu/project-menu.component';
import { AuthGuard } from './auth.guard';
import {EditProjectComponent} from "./portfolio/edit-project/edit-project.component";
import {AddProjectComponent} from "./portfolio/add-project/add-project.component";
import {DeleteProjectComponent} from "./portfolio/delete-project/delete-project.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'project-menu', component: ProjectMenuComponent, canActivate: [AuthGuard] },
  { path: 'add-project', component: AddProjectComponent, canActivate: [AuthGuard] },
  { path: 'edit-project', component: EditProjectComponent, canActivate: [AuthGuard] },
  { path: 'delete-project', component: DeleteProjectComponent, canActivate: [AuthGuard] },
];
