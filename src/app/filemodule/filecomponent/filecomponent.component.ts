import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FileModel } from '../../model/filemodel';
import { AuthService } from '../../services/authenticationservice/authservice.service';
import { FileservicesService } from '../../services/fileservice/fileservices.service';

@Component({
  selector: 'app-filecomponent',
  templateUrl: './filecomponent.component.html',
  styleUrls: ['./filecomponent.component.css']
})
export class FilecomponentComponent implements OnInit {
  fileForm: FormGroup;
  file:File|null=null;
  isEditMode = false;
  number: number = 0; // To hold the file ID
  isLoading = false; // Loading state

  constructor(
    private fb: FormBuilder,
    private fileService: FileservicesService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute ,// Inject ActivatedRoute
    private authservice:AuthService
  ) {
    this.fileForm = this.fb.group({
      number: ['', Validators.required],
      entityname: ['', Validators.required],
      description: [''],
      name: ['', Validators.required],
      imageData: [null, Validators.required], // For file upload
    });
  }

  ngOnInit(): void {
    // Subscribe to route parameters
    this.route.params.subscribe(params => {
      this.number = +params['id']; // Assuming the route parameter is 'id'
      if (this.number) {
        this.isEditMode = true;
        this.fileService.getFilecard(this.number).subscribe( cards=>{
          const card:FileModel=cards;
          
            this.fileForm.patchValue({
             entityname: card.entityname,
             description:card.description,
             imageData:card.imageData,
             number:card.number,
             name:card.name
            });

          })
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // Allow only PDF files
      const allowedTypes = ['application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        this.snackBar.open('Invalid file type. Please upload a PDF file.', 'Close', { duration: 3000 });
        return;
      }
      this.file=file;
      this.fileForm.patchValue({
        imageData: file
      });
      this.fileForm.get('imageData')?.updateValueAndValidity(); // Update validity
    }
  }

  onSubmit() {
    if (this.fileForm.valid) {
      const familyid:number = Number(localStorage.getItem("familyid"));
      const formData = new FormData();

      if (this.file) {
        formData.append('pdfFile', this.file, this.file.name); 
      }
      formData.append('number', this.fileForm.get('number')?.value); 
      formData.append('entityname', this.fileForm.get('entityname')?.value);
      formData.append('description', this.fileForm.get('description')?.value);
      formData.append('name', this.fileForm.get('name')?.value);    
      formData.append('familyid',String(familyid));

      this.isLoading = true; 
      const request = this.isEditMode 
        ? this.fileService.updateFileCard(this.number, formData) 
        : this.fileService.addFileCard(formData);
      
      request.subscribe({
        
        next: () => {
          this.snackBar.open('File uploaded successfully!', 'Close', { duration: 3000 });
         
          this.router.navigate(['/files/list',familyid]); 
     
          this.fileForm.reset(); 
        },
        error: (error) => {
          console.error('Upload failed', error);
          this.snackBar.open('Upload failed. Please try again.', 'Close', { duration: 3000 });
        },
        complete: () => {
          this.isLoading = false; // Reset loading state
        }
      });
    }
  }
}
