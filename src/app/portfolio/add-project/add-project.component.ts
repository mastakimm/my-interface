import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
  ],
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  project = { name: '', description: '' };

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.apiService.post('projects', this.project).subscribe(
      (response: any) => {
        console.log('Projet ajouté:', response);
      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du projet:', error);
      }
    );
  }
}
