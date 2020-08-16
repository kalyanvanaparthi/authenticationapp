import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email;
  password;
  credentials: TokenPayload;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(!this.email || !this.password) {
      alert("Please fill all the fields!!!");
    } else {
      this.credentials = {
        email: this.email,
        password: this.password
      }

      this.auth.login(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/profile');
      }, (err) => {
        alert(err.message);
      })
    }
  }

}
