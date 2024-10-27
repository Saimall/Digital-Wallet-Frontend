import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authenticationservice/authservice.service';
import { RtoserviceService } from '../../services/rtoservice/rtoservice.service';
import { Rtomodel } from '../../model/rtomodel';
@Component({
  selector: 'app-rtocomponent',
  templateUrl: './rtocomponent.component.html',
  styleUrl: './rtocomponent.component.css'
})
export class RtocomponentComponent {
  rtoform: FormGroup;
  isEditMode = false;
  cardNumber: number=0;

  constructor(
    private fb: FormBuilder,
    private rtoService: RtoserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice:AuthService,
    private snackbar:MatSnackBar
  ) {
    this.rtoform = this.fb.group({
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
    this.rtoService.getRtocard(cardNumber).subscribe(cards => {
      const card:Rtomodel = cards 
      this.rtoform.patchValue({ 
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
    console.log(this.rtoform)
    if (this.rtoform.valid) {
      const familyid:number = Number(localStorage.getItem("familyid"));
      if (this.isEditMode) {

        const updatedData = {
          ...this.rtoform.value, 
          familyid: localStorage.getItem("familyid")
        };
        this.rtoService.updateRtoCard(this.cardNumber, updatedData).subscribe({
          next:(reponse)=>{
          this.snackbar.open('Card Updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"success-snackbar"
          });
            
          this.router.navigate(['/rto/list',familyid]);
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
          ...this.rtoform.value, 
          familyid: localStorage.getItem("familyid")
        };
       
        this.rtoService.addRtoCard(addData).subscribe( {
          next:(response)=>{
          this.snackbar.open('Card Added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass:"success-snackbar"
          });
          this.router.navigate(['/rto/list',familyid]); // Navigate to list after adding
          },
          error:error=>{
              this.snackbar.open('Error while adding the card', 'Close', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass:"error-snackbar"
              });
                
              this.router.navigate(['/rto/list',familyid]);
            },
           
          
        });
      }
    }
  }
}
