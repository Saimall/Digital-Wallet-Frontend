import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authenticationservice/authservice.service';
import { FoodservicesService } from '../../services/foodservice/foodservices.service';
import { Foodmodel } from '../../model/foodmodel';
@Component({
  selector: 'app-foodcomponent',
  templateUrl: './foodcomponent.component.html',
  styleUrl: './foodcomponent.component.css'
})
export class FoodcomponentComponent implements OnInit {
  foodform:FormGroup;
  isEditMode:boolean=false;
  cardNumber:number=0;

  constructor(
    private fb: FormBuilder,
    private foodService: FoodservicesService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice:AuthService,
    private snackbar:MatSnackBar
  ) {
    this.foodform = this.fb.group({
      number: [null, Validators.required],
      entityname: ['', Validators.required],
      issueDate: ['', Validators.required],
      expireDate: ['', Validators.required],
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
    this.foodService.getFoodcard(cardNumber).subscribe(cards => {
      const card:Foodmodel = cards 
      this.foodform.patchValue({ 
        number: card.number,
        entityname: card.entityname,
        issueDate: card.issueDate,
        expireDate: card.expireDate,
        username: card.username
      });
    });
  }

  onSubmit(): void {
    console.log("onsubmit calling!!!");
        console.log(this.foodform)
        if (this.foodform.valid) {
          const familyid:number = Number(localStorage.getItem("familyid"));
          if (this.isEditMode) {
    
            const updatedData = {
              ...this.foodform.value, 
              familyid: localStorage.getItem("familyid")
            };
            this.foodService.updateFoodCard(this.cardNumber, updatedData).subscribe({
              next:(reponse)=>{
              this.snackbar.open('Card Updated successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass:"success-snackbar"
              });
                
              this.router.navigate(['/food/list',familyid]);
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
              ...this.foodform.value, 
              familyid: localStorage.getItem("familyid")
            };
           
            this.foodService.addFoodCard(addData).subscribe( {
              next:(response)=>{
              this.snackbar.open('Card Added successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass:"success-snackbar"
              });
              this.router.navigate(['/food/list',familyid]); // Navigate to list after adding
              },
              error:error=>{
                  this.snackbar.open('Error while adding the card', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'right',
                    verticalPosition: 'top',
                    panelClass:"error-snackbar"
                  });
                    
                  this.router.navigate(['/food/list',familyid]);
                },
               
              
            });
          }
        }
      }


}
