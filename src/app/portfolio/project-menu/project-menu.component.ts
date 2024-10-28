import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {EditProjectComponent} from "../edit-project/edit-project.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-project-menu',
  standalone: true,
  templateUrl: './project-menu.component.html',
  imports: [
    NgIf,
    EditProjectComponent,
    MatProgressSpinner,
    NgStyle,
    MatButton,
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./project-menu.component.css']
})
export class ProjectMenuComponent implements OnInit {
  projects: any[] = [];
  loading: boolean = true;
  selectedProject: any = null; // Stores the project to be edited
  isEditModalOpen: boolean = false; // Controls modal visibility

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.apiService.get('projects').subscribe(
      (data) => {
        this.projects = data.body;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.loading = false;
      }
    );
  }

  editProject(project: any) {
    this.selectedProject = project;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedProject = null;
  }

  saveProjectChanges(updatedProject: any) {
    console.log('Updated Project Data:', updatedProject);
    this.closeEditModal();
  }

  removeProject() {

  }
}
