import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService  {

  http: HttpClient;
  AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
  // use your client id. Get in Spotify Developer page
  clientId = 'xxxxxxxxxxxxxxxxxxxxxxxxx';
  responseType = 'token';
  redirectUri = 'http://localhost:4200/index';
  scopes = 'user-read-currently-playing user-read-private' +
            ' playlist-read-private user-library-read' +
            ' user-read-playback-state user-modify-playback-state';
  state = '123';

  USERS_URL = 'https://api.spotify.com/v1/users';
  USER_URL = 'https://api.spotify.com/v1/me';
  user: User = new User();
  headers;

  constructor(http: HttpClient) {
    this.http = http;
    this.headers = new HttpHeaders().
    set('Accept', 'application/json').
    set('Content-Type', 'application/json').
    set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  }

  getUrl(): string {
    return this.AUTHORIZE_URL + '?client_id=' + this.clientId +
            '&response_type=' + this.responseType +
            '&redirect_uri=' + this.redirectUri +
            '&state=' + this.state +
            '&scope=' + this.scopes;
  }

  nextTrack() {
    console.log('next');
    this.http.post('https://api.spotify.com/v1/me/player/next', null, { headers: this.headers})
    .pipe(delay(1000)).subscribe(
      data => this.fetchCurrentTrack()
    );
  }

  getUserProfile() {
    const url = this.USER_URL;
    this.http.get(url, { headers: this.headers } ).subscribe(
      data => { this.setUserId(data);
                this.fetchPlaylists();
                this.fetchCurrentTrack(); }
    );
  }

  fetchPlaylists() {
    // https://api.spotify.com/v1/users/wizzler/playlists
    //  this.http.get('https://api.spotify.com/v1/users/' + this.user.userId + '/playlists',
    this.http.get('https://api.spotify.com/v1/users/' + this.user.userId + '/playlists',
      { headers: this.headers }).subscribe(
        pls => this.setPlaylists(pls)
      );
  }

  fetchCurrentTrack() {
    this.http.get('https://api.spotify.com/v1/me/player/currently-playing',
      { headers: this.headers }).subscribe(
        track => this.setCurrentTrack(track)
      );
  }

  setCurrentTrack(track) {
    this.user.currentTrack = JSON.parse(JSON.stringify(track)).item.name;
  }

  // get playlists
  setPlaylists(data) {
    // console.log(JSON.parse(JSON.stringify(data)));
    const pls = JSON.parse(JSON.stringify(data)).items;
    for (const pl of pls) {
      this.user.playlists.push(pl.name);
    }
  }

  setUserId(data) {
    console.log(data);
    this.user.userId = JSON.parse(JSON.stringify(data)).id;
    this.user.displayName = JSON.parse(JSON.stringify(data)).display_name;
  }


  isValidToken(): boolean {
    const token = localStorage.getItem('access_token');
    const expires = localStorage.getItem('expires');
    console.log('token: ' + token);
    console.log('expires: ' + expires);
    console.log('now: ' + Date.now());

    if (localStorage.getItem('access_token') === null) { return false; }
    if (localStorage.getItem('access_token') === undefined) { return false; }
    if (expires === null || +expires < Date.now()) { return false; }
    return true;
  }
  // curl -X "GET" "https://api.spotify.com/v1/me"  -H "Authorization: Bearer "

}
