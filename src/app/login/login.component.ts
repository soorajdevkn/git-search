import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MasterService } from '../classes/master-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private toastr: ToastrService,private dataService: MasterService, private router: Router, private service: LoginService) { }
  ngOnInit() {}
  login() {
    this.service.login(this.email, this.password).subscribe(response => {
      this.toastr.success("Login Successfully!!", '', {
        timeOut: 1500,
      });
      localStorage.setItem("login","true");
      this.router.navigate([this.dataService.redirectUrl]);
    },
      err => {
        localStorage.setItem("login","false");
        this.toastr.error(err.message, '', {
          timeOut: 1500,
        });
      }
    )
  }
}
