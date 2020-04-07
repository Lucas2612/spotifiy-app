import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { User } from '../entity/user';


@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.authorizationService.isValidToken()){
      window.location.href = '/index';
    }
    this.fetchUser();
  }

  cleanToken() {
    localStorage.clear();
  }

  nextTrack() {
    this.authorizationService.nextTrack();
  }

  accessToken() {
    return localStorage.getItem('access_token');
  }

  getUser(): User {
    return this.authorizationService.user;
  }

  fetchUser(){
    this.authorizationService.getUserProfile();
  }




}
