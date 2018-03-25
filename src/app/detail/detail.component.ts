import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from './detail.service';
import { User } from '../classes/user';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  profile:User;
  repo:any;
  followers:User[] = [];
  repoTab:boolean = true;
  followersTab:boolean = false;
  constructor(private router: ActivatedRoute, private service: DetailService) { }
  ngOnInit() {
    this.service.getUser(this.router.snapshot.paramMap.get('username')).subscribe(response=>{
      this.profile = new User(response.name,response.logn,response.avatar_url,response.location,response.company,response.email);
      this.service.getFollowers(response.followers_url).subscribe(rf => {
        rf.map((rfv) => {
          this.service.getUser(rfv.login).subscribe(r => {
            let user = new User(r.name,r.login,r.avatar_url,r.location,r.company,r.email);
            this.followers.push(user);
          })
        })
      })
    })
    this.service.getRepo(this.router.snapshot.paramMap.get('username')).subscribe(response=>{
      this.repo = response;
    })
  }
}