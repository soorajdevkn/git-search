import { Component, OnInit, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../classes/master-service';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import { Profiles } from '../classes/profile';
import { User } from '../classes/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  scrollLock: boolean;
  userDatas:Profiles[] = [];
  searchString: string;
  constructor(private service: HomeService, private toastr: ToastrService, private master: MasterService) { }
  ngOnInit() {
    this.getUsers();
  }
  @HostListener("window:scroll", []) onScroll(): void {
    if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && (this.searchString == null || this.searchString == '')) {
      this.scrollLock = true;
      if (this.scrollLock) {
        this.getUsers();
        this.scrollLock = false;
      }
    }
  }
  getUsers() {
    this.service.getUsers(this.master.lastGetId).subscribe(response => {
      response.map((val,i) => {
        this.getUser(val,i);
      });
      this.master.lastGetId = response[response.length - 1].id;
    }, err => {
      this.toastr.error(err.message, '', {
        timeOut: 1500,
      });
    })
  }
  getUsersByUsearname(searchString) {
    if (searchString == '') {
      this.master.lastGetId = 0;
      this.userDatas = [];
      this.getUsers();
    } else {
      this.service.searchUser(searchString).subscribe(response => {
        this.userDatas = [];
        response.items.map((val,i) => {
          this.getUser(val,i);
        });
      }, err => {
        this.toastr.error(err.message, '', {
          timeOut: 1500,
        });
      })
    }
  }
  getUser(val,i){
    this.service.getUser(val.login).subscribe(r => {
      let followers:User[] = [];
      let user = new Profiles(r.name,r.login,r.avatar_url,r.location,r.company,r.email,followers);
      this.userDatas.push(user);
      this.userDatas[i].followers = [];
      this.getFollowers(val,i);
    }, err => {
      this.toastr.error(err.message, '', {
        timeOut: 1500,
      });
    })
  }
  getFollowers(val,i){
    this.service.getFollowers(val.followers_url).subscribe(rf => {
      rf.map((rfv) => {
        this.service.getUser(rfv.login).subscribe(r => {
          let user = new User(r.name,r.login,r.avatar_url,r.location,r.company,r.email);
          this.userDatas[i].followers.push(user);
        })
      })
    }, err => {
      this.toastr.error(err.message, '', {
        timeOut: 1500,
      });
    })
  }
}