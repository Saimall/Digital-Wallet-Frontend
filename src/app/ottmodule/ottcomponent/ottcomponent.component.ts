import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authenticationservice/authservice.service';
import { OttserviceService } from '../../services/ottservice/ottservice.service';

import { Ottmodel } from '../../model/ottmodel';

@Component({
  selector: 'app-ottcomponent',
  templateUrl: './ottcomponent.component.html',
  styleUrl: './ottcomponent.component.css'
})
export class OttcomponentComponent implements OnInit {
  ottform:FormGroup;
  cardnumber:number=0;
  isEditMode: boolean=false;
  constructor(
    private fb: FormBuilder,
    private ottService: OttserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice:AuthService,
    private snackbar:MatSnackBar
  ) {
    this.ottform = this.fb.group({
      number: [null, Validators.required],
      entityname: ['', Validators.required],
      expiryDate: ['', Validators.required],
      username: ['', Validators.required],
      password:['',Validators.required]
     
    });
  }

  



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cardNumberParam = params.get('number');
      console.log(cardNumberParam);
      if (cardNumberParam !== null) {
        this.cardnumber = +cardNumberParam; //we can convert into number 
        this.isEditMode = true;
        this.loadAtmCard(this.cardnumber);
      }
    });
  }

  loadAtmCard(cardNumber: number): void {
    this.ottService.getOttcard(cardNumber).subscribe(cards => {
      const card:Ottmodel = cards 
      this.ottform.patchValue({ 
        number: card.number,
        entityname: card.entityname,
        expiryDate: card.expiryDate,
        username: card.username,
        password:card.password
      });
    });
  }


  onSubmit(): void {
    console.log("onsubmit calling!!!");
        console.log(this.ottform)
        if (this.ottform.valid) {
          const familyid:number = Number(localStorage.getItem("familyid"));
          if (this.isEditMode) {
    
            const updatedData = {
              ...this.ottform.value, 
              familyid: localStorage.getItem("familyid")
            };
            this.ottService.updateOttCard(this.cardnumber, updatedData).subscribe({
              next:(reponse)=>{
              this.snackbar.open('Card Updated successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass:"success-snackbar"
              });
                
              this.router.navigate(['/ott/list',familyid]);
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
              ...this.ottform.value, 
              familyid: localStorage.getItem("familyid")
            };
           
            this.ottService.addOttCard(addData).subscribe( {
              next:(response)=>{
              this.snackbar.open('Card Added successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass:"success-snackbar"
              });
              this.router.navigate(['/ott/list',familyid]); // Navigate to list after adding
              },
              error:error=>{
                  this.snackbar.open('Error while adding the card', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass:"error-snackbar"
                  });
                    
                  this.router.navigate(['/ott/list',familyid]);
                },
               
              
            });
          }
        }
    
      }
}
