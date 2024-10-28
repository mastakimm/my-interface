import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-project',
  standalone: true,
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf
  ]
})
export class EditProjectComponent implements OnInit{
  @Input() project: any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  editForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    overview: new FormControl(''),
    tools: new FormControl(''),
    githubUrl: new FormControl(''),
    liveUrl: new FormControl(''),
    mainProject: new FormControl(false),
    image: new FormControl(''),
  });

  imagePreview: string | ArrayBuffer | null = null;

  ngOnInit(): void {
    if (this.project) {
      this.editForm.patchValue(this.project);
      this.imagePreview = this.project.image;
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.editForm.patchValue({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    if (this.editForm.valid) {
      this.onSave.emit(this.editForm.value);
    }
  }

  closeModal() {
    this.onClose.emit();
  }
}
