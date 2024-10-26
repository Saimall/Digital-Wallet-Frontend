import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  form: FormGroup;
  isRegistering: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      familyid: ['', Validators.required] // Add familyId field
    });
  }

  validateUser() {
    console.log(this.form.value)
    this.userService.validateUser(this.form.value.username, this.form.value.password).subscribe({
      next: (response) => {

        localStorage.setItem("auth",response.message)
        this.snackBar.open('User validated successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/home']);
      },
      error: error => {
        this.snackBar.open('Invalid username or password', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  registerUser() {
    console.log(this.form.value)
    this.userService.register(this.form.value).subscribe({ // Pass the entire form value
      next: () => {
        this.snackBar.open('User registered successfully!', 'Close', {
          duration: 3000,
        });
        this.isRegistering = false; 
        this.form.reset(); 
      },
      error: error => {
        console.log(error)
        this.snackBar.open('Registration failed', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering; 
    this.form.reset(); // Reset form when toggling
  }
}
