import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false

  constructor(private readonly sessionService: SessionService) { }

  ngOnInit(): void {
    this.loggedIn = this.sessionService.loggedIn 
  }

  //loggedIn: boolean = this.sessionService.loggedIn 

  public logOut(): void {
    this.sessionService.logout()
  }

}
