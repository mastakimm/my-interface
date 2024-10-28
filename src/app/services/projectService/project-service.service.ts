import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private apiService: ApiService) { }

  getAllProjects(): Observable<any> {
    return this.apiService.get('projects');
  }
}
