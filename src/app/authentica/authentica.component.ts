import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentica',
  templateUrl: './authentica.component.html',
  styleUrls: ['./authentica.component.css']
})
export class AuthenticaComponent implements OnInit {

  constructor(private service: AuthorizationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.service.isValidToken()){
      window.location.href = '/spot';
    } else {
      this.route.fragment.subscribe((fragment: string) => {
        this.splitFragment(fragment);
      });
      if (this.service.isValidToken()){
        window.location.href = '/spot';
      } else {
        window.location.href = this.service.getUrl();
      }
    }
  }

  private splitFragment(fragment: string) {
    if (fragment !== null) {
      const arrFragment = fragment.split('&');
      localStorage.setItem('access_token', arrFragment[0].split('=')[1]);
      const exp = Date.now() + +arrFragment[2].split('=')[1];
      localStorage.setItem('expires', exp.toString());

    }
  }

}
