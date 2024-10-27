import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authenticationservice/authservice.service';

import { MedicalserviceService } from '../../services/medicalservice/medicalservice.service';

@Component({
  selector: 'app-medicallistcomponent',
  templateUrl: './medicallistcomponent.component.html',
  styleUrl: './medicallistcomponent.component.css'
})
export class MedicallistcomponentComponent {

  medicalCards: any[] = [];
  familyid:number=0;

  constructor(private medicalservice: MedicalserviceService, private router: Router, private route: ActivatedRoute,private authservice:AuthService,private snackbar:MatSnackBar) {}
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.familyid = +params['familyid'];
      console.log("familyid",this.familyid);
      this.loadAtmCards();
    });
  }

  loadAtmCards() {
    this.familyid= Number(localStorage.getItem("familyid"));
    this.medicalservice.getMedicalCards(this.familyid).subscribe(cards => {
      this.medicalCards = cards;
    });
  }

  editCard(card: any) {
    this.router.navigate(['medical/edit', card.number]);
  }

  deleteCard(cardnumber: number) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.medicalservice.deleteMedicalCard(cardnumber).subscribe({
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
            panelClass: "error-snackbar" 
          });
        }
      });
    }
  }

}
