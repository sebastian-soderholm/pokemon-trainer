import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private readonly sessionService: SessionService) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.sessionService.logout()
  }

}
