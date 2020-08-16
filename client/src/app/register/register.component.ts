import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name;
  email;
  password;
  password2;

  credentials : TokenPayload;

  constructor( private auth : AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    if(!this.name || !this.email || !this.password || !this.password2) {
      alert("Please Fill All The Fields And Then Continue");
    } else if( this.password != this.password2) {
      alert("Password Mismatch")
    } else {
      this.credentials = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.auth.register(this.credentials).subscribe(() => {
        this.router.navigateByUrl('/profile');
      }, (err) => {
        console.log(err);
      })
    }

  }

}
