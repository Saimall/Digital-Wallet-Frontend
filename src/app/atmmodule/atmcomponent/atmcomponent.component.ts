// atm-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtmService } from '../../services/atmservice/atmservice.service';
import { HttpClient } from '@angular/common/http';
import { Atmmodel } from '../../model/atmmodel';
import { AuthService } from '../../services/authenticationservice/authservice.service';

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
    private authservice:AuthService
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
    // Check if we're in edit mode
    this.route.paramMap.subscribe(params => {
      const cardNumberParam = params.get('number');
      console.log(cardNumberParam);
      if (cardNumberParam !== null) {
        this.cardNumber = +cardNumberParam; // Convert to number
        this.isEditMode = true;
        this.loadAtmCard(this.cardNumber);
      }
    });
  }
  

  loadAtmCard(cardNumber: number): void {
    this.atmService.getAtmCards(cardNumber).subscribe(cards => {
      const card = cards[0]; // Assuming the API returns an array
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
      const familyid:number = Number(this.authservice.getFamilyId());
      if (this.isEditMode) {

        this.atmService.updateAtmCard(this.cardNumber, this.atmform.value).subscribe(() => {
          

          this.router.navigate(['/atm/list',familyid]); // Navigate to list after update
        });
      } else {
        const addData = {
          ...this.atmform.value, 
          familyid: this.authservice.getFamilyId() 
        };
       
        this.atmService.addAtmCard(addData).subscribe(() => {
          this.router.navigate(['/atm/list',familyid]); // Navigate to list after adding
        });
      }
    }
  }
}
