import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/authenticationservice/authservice.service';
import { FileservicesService } from '../../services/fileservice/fileservices.service';


@Component({
  selector: 'app-filelistcomponent',
  templateUrl: './filelistcomponent.component.html',
  styleUrl: './filelistcomponent.component.css'
})


export class FilelistcomponentComponent {

  fileCards: any[] = [];
  familyid:number=0;

  constructor(private fileService: FileservicesService, private router: Router, private route: ActivatedRoute,private authservice:AuthService,private snackbar:MatSnackBar) {}
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.familyid = +params['familyid'];
      console.log("familyid",this.familyid);
      this.loadAtmCards();
    });
  }

  loadAtmCards() {
    this.familyid= Number(localStorage.getItem("familyid"));
    this.fileService.getFileCards(this.familyid).subscribe(cards => {
      console.log(cards);
      this.fileCards = cards;
    });
  }

  editCard(card: any) {
    this.router.navigate(['files/edit', card.number]);
  }

  deleteCard(cardnumber: number) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.fileService.deleteFileCard(cardnumber).subscribe({
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
