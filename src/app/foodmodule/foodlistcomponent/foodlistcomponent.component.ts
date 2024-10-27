import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/authenticationservice/authservice.service';
import { FoodservicesService } from '../../services/foodservice/foodservices.service';

@Component({
  selector: 'app-foodlistcomponent',
  templateUrl: './foodlistcomponent.component.html',
  styleUrl: './foodlistcomponent.component.css'
})
export class FoodlistcomponentComponent {

  
  foodCards: any[] = [];
  familyid:number=0;

  constructor(private foodService:FoodservicesService , private router: Router, private route: ActivatedRoute,private authservice:AuthService,private snackbar:MatSnackBar) {}
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.familyid = +params['familyid'];
      console.log("familyid",this.familyid);
      this.loadAtmCards();
    });
  }

  loadAtmCards() {
    this.familyid= Number(localStorage.getItem("familyid"));
    this.foodService.getFoodCards(this.familyid).subscribe(cards => {
      this.foodCards = cards;
    });
  }

  editCard(card: any) {
    this.router.navigate(['food/edit', card.number]);
  }

  deleteCard(cardnumber: number) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.foodService.deleteFoodCard(cardnumber).subscribe({
        next: () => {
          this.loadAtmCards(); 
          this.snackbar.open('Deleted card successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: "success-snackbar"
          });
        },
        error: () => {
          this.snackbar.open('Error while deleting the card!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: "error-snackbar" // Use a different class for error
          });
        }
      });
    }
  }
  

}
