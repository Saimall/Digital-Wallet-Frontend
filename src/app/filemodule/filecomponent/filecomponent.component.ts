import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authenticationservice/authservice.service';
import { FileservicesService } from '../../services/fileservice/fileservices.service';
import { Filemodel } from '../../model/filemodel';

@Component({
  selector: 'app-filecomponent',
  templateUrl: './filecomponent.component.html',
  styleUrl: './filecomponent.component.css'
})
export class FilecomponentComponent {
  fileform: FormGroup;
  isEditMode = false;
  cardNumber: number=0;

  constructor(
    private fb: FormBuilder,
    private fileService: FileservicesService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice:AuthService,
    private snackbar:MatSnackBar
  ) {
    this.fileform = this.fb.group({
      number: [null, Validators.required],
      entityname: ['', Validators.required],
      description: ['', Validators.required],
      name: ['', Validators.required],
      imageData: ['', Validators.required],
     
    });
  }

  selectedFile: File | null = null;
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const cardNumberParam = params.get('number');
      console.log(cardNumberParam);
      if (cardNumberParam !== null) {
        this.cardNumber = +cardNumberParam; //we can convert into number 
        this.isEditMode = true;
        this.loadAtmCard(this.cardNumber);
      }
    });
  }
  

  loadAtmCard(cardNumber: number): void {
    this.fileService.getFilecard(cardNumber).subscribe(cards => {
      const card:Filemodel = cards 
      this.fileform.patchValue({ 
        number: card.number,
        entityname: card.entityname,
       description: card.description,
        name: card.name,
        imageData: card.imageData
      });
    });
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.imageType === 'application/pdf') {
      this.selectedFile = file;
      this.fileform.patchValue({ file: file.imageData }); 
    } else {
      alert('Please upload a PDF file.');
      this.selectedFile = null;
    }
  }


  onSubmit(): void {
console.log("onsubmit calling!!!");
    console.log(this.fileform)
    if (this.fileform.valid) {
      const familyid:number = Number(localStorage.getItem("familyid"));
      if (this.isEditMode) {

        const updatedData = {
          ...this.fileform.value, 
          familyid: localStorage.getItem("familyid")
        };
        this.fileService.updateFileCard(this.cardNumber, updatedData).subscribe({
          next:(reponse)=>{
          this.snackbar.open('Card Updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"success-snackbar"
          });
            
          this.router.navigate(['/files/list',familyid]);
        },
        error:error=>{
          this.snackbar.open('Error while updating the card', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"error-snackbar"
          });

        }
        });
        
      } else {
        const addData = {
          ...this.fileform.value, 
          familyid: localStorage.getItem("familyid")
        };
       
        this.fileService.addFileCard(addData).subscribe( {
          next:(response)=>{
          this.snackbar.open('Card Added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"success-snackbar"
          });
          this.router.navigate(['/file/list',familyid]); // Navigate to list after adding
          },
          error:error=>{
              this.snackbar.open('Error while adding the card', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass:"error-snackbar"
              });
                
              this.router.navigate(['/file/list',familyid]);
            },
           
          
        });
      }
    }
  }
}
