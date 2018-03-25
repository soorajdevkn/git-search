import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login:boolean;
  authSubscription:Subscription
  constructor(private toastr: ToastrService,private authService:LoginService, private router: Router){
    this.authSubscription = this.authService.watchAuthenticate().subscribe(message => {
      if(this.authService.checkAuth()){
        this.login = true;
      }
    });
  }
  ngOnInit(): void {
    if(this.authService.checkAuth()){
      this.login = true;
    }
  }
  logout(){
    this.authService.logout();
    this.login = false;
    this.toastr.success("Logout Successfully!!", '', {
      timeOut: 1500,
    });
    this.router.navigate(["/login"]);
  }
}
