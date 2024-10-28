import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authenticationservice/authservice.service';
import { FileservicesService } from '../../services/fileservice/fileservices.service';
import { FileModel } from '../../model/filemodel';

@Component({
  selector: 'app-filecomponent',
  templateUrl: './filecomponent.component.html',
  styleUrl: './filecomponent.component.css'
})
export class FilecomponentComponent {
  fileForm: FormGroup;
  isEditMode = false;
  fileId: number=0; // Assuming you'll get this from route params or similar

  constructor(
    private fb: FormBuilder,
    private fileService: FileservicesService,
    private router: Router
  ) {
    this.fileForm = this.fb.group({
      number: ['', Validators.required],
      entityname: ['', Validators.required],
      description: [''],
      name: ['', Validators.required],
      imageData: [null, Validators.required] // For file upload
    });
  }

  ngOnInit(): void {
    
    if (this.isEditMode) {
      this.fileService.getFilecard(this.fileId).subscribe(file => {
        this.fileForm.patchValue(file);
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileForm.patchValue({
        imageData: file 
      });
    }
  }

  onSubmit() {
    if (this.fileForm.valid) {
      const formData = new FormData();
     
      for (const key in this.fileForm.controls) {
        const value = this.fileForm.controls[key].value;
        if (key === 'imageData') {
          formData.append(key, value, value.name); // Append file with name
        } else {
          formData.append(key, value);
        }
      }
      if (this.isEditMode) {
        this.fileService.updateFileCard(this.fileId, formData).subscribe(() => {
          this.router.navigate(['/files/']); // Redirect after save
        });
      } else {
        this.fileService.addFileCard(formData).subscribe(() => {
          this.router.navigate(['/files/list']); // Redirect after save
        });
      }
    }
  }
}
