import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cards = [
    { title: 'ATM Cards', description: 'Manage your ATM cards', action: 'atm' },
    { title: 'OTT', description: 'Manage your OTT subscriptions', action: 'ott' },
    { title: 'Medical Cards', description: 'Manage your medical cards', action: 'medical' },
    { title: 'Files', description: 'Upload and manage files', action: 'files' },
    { title: 'Healthcards', description: 'Manage your health cards', action: 'health' },
    { title: 'RTO Cards', description: 'Manage your RTO cards', action: 'rto' }
  ];

  view(card: any) {
    // Navigate to the respective component or perform an action
    console.log('Viewing:', card);
  }

  edit(card:any) {
    // Implement edit functionality
    console.log('Editing:', card);
  }

  add(card:any) {
    // Implement add functionality
    console.log('Adding:', card);
  }
}
