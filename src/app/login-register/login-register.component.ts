import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  showLogin: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
    if (this.userService.getRole()) {
      this.router.navigate(['/home']); // Redirect to home or dashboard
    }
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      terms: [false, Validators.requiredTrue] 
    });
  }
  

  showLoginForm(): void {
    this.showLogin = true;
  }

  showRegisterForm(): void {
    this.showLogin = false;
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) {
      alert('Please enter valid email and password.');
      return;
    }
  
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        alert('Login Successful');
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('role', response.role); // Store user role
  
        if (response.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error: any) => {
        alert('Invalid credentials! Try again.');
      }
    );
  }
    onRegisterSubmit(): void {
    if (this.registerForm.invalid) {
      alert('Please fill in all required fields correctly.');
      return;
    }
  
    this.userService.register(this.registerForm.value).subscribe(
      (response: any) => {
        alert('Registration successful!');
        this.showLogin = true;
      },
      (error: any) => {
        console.error('Registration error:', error); // Log error details
        alert('Registration failed! ' + (error?.error?.message || 'Try again.'));
      }
    );
  }
  
}