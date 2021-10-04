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
    // Checks if user is logged in 
    this.loggedIn = this.sessionService.loggedIn 
  }

  // Handles log out click
  public logOut(): void {
    this.sessionService.logout()
  }

}
