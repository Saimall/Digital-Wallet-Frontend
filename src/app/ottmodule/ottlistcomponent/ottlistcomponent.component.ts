import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/authenticationservice/authservice.service';

import { OttserviceService } from '../../services/ottservice/ottservice.service';

@Component({
  selector: 'app-ottlistcomponent',
  templateUrl: './ottlistcomponent.component.html',
  styleUrl: './ottlistcomponent.component.css'
})
export class OttlistcomponentComponent {

  ottCards: any[] = [];
  familyid:number=0;

  constructor(private ottService: OttserviceService, private router: Router, private route: ActivatedRoute,private authservice:AuthService,private snackbar:MatSnackBar) {}
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.familyid = +params['familyid'];
      console.log("familyid",this.familyid);
      this.loadAtmCards();
    });
  }

  loadAtmCards() {
    this.familyid= Number(localStorage.getItem("familyid"));
    this.ottService.getOttCards(this.familyid).subscribe(cards => {
      this.ottCards = cards;
    });
  }

  editCard(card: any) {
    this.router.navigate(['ott/edit', card.number]);
  }

  deleteCard(cardnumber: number) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.ottService.deleteOttCard(cardnumber).subscribe({
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
