import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtmService } from '../../services/atmservice/atmservice.service';
import { AuthService } from '../../services/authenticationservice/authservice.service';

@Component({
  selector: 'app-atmlistcomponent',
  templateUrl: './atmlistcomponent.component.html',
  styleUrl: './atmlistcomponent.component.css'
})
export class AtmlistcomponentComponent {

  atmCards: any[] = [];
  familyid:number=0;

  constructor(private atmService: AtmService, private router: Router, private route: ActivatedRoute,private authservice:AuthService) {}
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.familyid = +params['familyid'];
      console.log("familyid",this.familyid);
      this.loadAtmCards();
    });
  }

  loadAtmCards() {
    this.familyid= Number(localStorage.getItem("familyid"));
    this.atmService.getAtmCards(this.familyid).subscribe(cards => {
      this.atmCards = cards;
    });
  }

  editCard(card: any) {
    this.router.navigate(['/edit', card.id]);
  }

  deleteCard(cardId: number) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.atmService.deleteAtmCard(cardId).subscribe(() => {
        this.loadAtmCards(); // Refresh the list after deletion
      });
    }
  }

}
