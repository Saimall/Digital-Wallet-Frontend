import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicalmodel } from '../../model/medicalmodel';
import { AuthService } from '../../services/authenticationservice/authservice.service';

import { MedicalserviceService } from '../../services/medicalservice/medicalservice.service';
@Component({
  selector: 'app-medicalcomponent',
  templateUrl: './medicalcomponent.component.html',
  styleUrl: './medicalcomponent.component.css'
})
export class MedicalcomponentComponent {

  medicalform: FormGroup;
  isEditMode = false;
  cardNumber: number=0;

  constructor(
    private fb: FormBuilder,
    private medicalService:MedicalserviceService ,
    private route: ActivatedRoute,
    private router: Router,
    private authservice:AuthService,
    private snackbar:MatSnackBar
  ) {
    this.medicalform = this.fb.group({
      number: [null, Validators.required],
      entityname: ['', Validators.required],
      issueDate: ['', Validators.required],
      expireDate: ['', Validators.required],
      policynumber: [null, Validators.required],
      username: ['', Validators.required],
     
    });
  }

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
    this.medicalService.getMedicalcard(cardNumber).subscribe(cards => {
      const card:Medicalmodel = cards 
      this.medicalform.patchValue({ 
        number: card.number,
        entityname: card.entityname,
        issueDate: card.issueDate,
        expireDate: card.expireDate,
        policynumber: card.policynumber,
        username: card.username
      });
    });
  }

  onSubmit(): void {
console.log("onsubmit calling!!!");
    console.log(this.medicalform)
    if (this.medicalform.valid) {
      const familyid:number = Number(localStorage.getItem("familyid"));
      if (this.isEditMode) {

        const updatedData = {
          ...this.medicalform.value, 
          familyid: localStorage.getItem("familyid")
        };
        this.medicalService.updateMedicalCard(this.cardNumber, updatedData).subscribe({
          next:(reponse)=>{
          this.snackbar.open('Card Updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"success-snackbar"
          });
            
          this.router.navigate(['/medical/list',familyid]);
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
          ...this.medicalform.value, 
          familyid: localStorage.getItem("familyid")
        };
       
        this.medicalService.addMedicalCard(addData).subscribe( {
          next:(response)=>{
          this.snackbar.open('Card Added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"success-snackbar"
          });
          this.router.navigate(['/medical/list',familyid]); // Navigate to list after adding
          },
          error:error=>{
              this.snackbar.open('Error while adding the card', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass:"error-snackbar"
              });
                
              this.router.navigate(['/medical/list',familyid]);
            },
           
          
        });
      }
    }
  }


}
