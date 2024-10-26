import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/authenticationservice/authservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  familyid: number=0;


  constructor(private router: Router, private authService: AuthService) {}
  

  cards = [
    { title: 'ATM Cards', description: 'Manage your ATM cards', action: 'atm' },
    { title: 'OTT', description: 'Manage your OTT subscriptions', action: 'ott' },
    { title: 'Medical Cards', description: 'Manage your medical cards', action: 'medical' },
    { title: 'Files', description: 'Upload and manage files', action: 'files' },
    { title: 'Healthcards', description: 'Manage your health cards', action: 'health' },
    { title: 'RTO Cards', description: 'Manage your RTO cards', action: 'rto' }
  ];
  
 
 
  view(card: any) {
    this.familyid = Number(this.authService.getFamilyId()); 
    console.log(this.familyid);
    console.log("Authentication in service",this.authService.isAuthenticated());
    
    this.router.navigate([`${card.action}/list/${this.familyid}`]);
    
    
  }

  edit(card:any) {
    this.familyid = Number(this.authService.getFamilyId()); 
    console.log(this.familyid);
    this.router.navigate([`${card.action}/edit/${this.familyid}`]);

   
  }

  add(card:any) {
    this.router.navigate([`${card.action}/add`]);
  
  }


  logout() {

    console.log("Tokenrmoveing");
   this.authService.removeToken(); 
    this.router.navigate(['/login']); 
  }
}
