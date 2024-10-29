import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-errorcomponent',
  templateUrl: './errorcomponent.component.html',
  styleUrl: './errorcomponent.component.css'
})
export class ErrorcomponentComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['home']); // Adjust as needed
  }

}
