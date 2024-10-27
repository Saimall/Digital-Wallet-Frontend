// atm-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtmService } from '../../services/atmservice/atmservice.service';
import { HttpClient } from '@angular/common/http';
import { Atmmodel } from '../../model/atmmodel';
import { AuthService } from '../../services/authenticationservice/authservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { nextTick } from 'process';

@Component({
  selector: 'app-atm-card',
  templateUrl: './atmcomponent.component.html',
  styleUrls: ['./atmcomponent.component.css']
})
export class AtmCardComponent implements OnInit {
  atmform: FormGroup;
  isEditMode = false;
  cardNumber: number=0;

  constructor(
    private fb: FormBuilder,
    private atmService: AtmService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice:AuthService,
    private snackbar:MatSnackBar
  ) {
    this.atmform = this.fb.group({
      number: [null, Validators.required],
      entityname: ['', Validators.required],
      issueDate: ['', Validators.required],
      expireDate: ['', Validators.required],
      cvv: [null, Validators.required],
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
    this.atmService.getAtmcard(cardNumber).subscribe(cards => {
      const card:Atmmodel = cards 
      this.atmform.patchValue({ 
        number: card.number,
        entityname: card.entityname,
        issueDate: card.issueDate,
        expireDate: card.expireDate,
        cvv: card.cvv,
        username: card.username
      });
    });
  }

  onSubmit(): void {
console.log("onsubmit calling!!!");
    console.log(this.atmform)
    if (this.atmform.valid) {
      const familyid:number = Number(localStorage.getItem("familyid"));
      if (this.isEditMode) {

        const updatedData = {
          ...this.atmform.value, 
          familyid: localStorage.getItem("familyid")
        };
        this.atmService.updateAtmCard(this.cardNumber, updatedData).subscribe({
          next:(reponse)=>{
          this.snackbar.open('Card Updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"success-snackbar"
          });
            
          this.router.navigate(['/atm/list',familyid]);
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
          ...this.atmform.value, 
          familyid: localStorage.getItem("familyid")
        };
       
        this.atmService.addAtmCard(addData).subscribe( {
          next:(response)=>{
          this.snackbar.open('Card Added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"success-snackbar"
          });
          this.router.navigate(['/atm/list',familyid]); // Navigate to list after adding
          },
          error:error=>{
              this.snackbar.open('Error while adding the card', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass:"error-snackbar"
              });
                
              this.router.navigate(['/atm/list',familyid]);
            },
           
          
        });
      }
    }
  }
}
