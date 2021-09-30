import { Component, OnInit } from '@angular/core';
import TrainerService from 'src/app/services/trainer.service';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  private _username: string = '';

  constructor(
        private readonly trainerService: TrainerService,
        private readonly router: Router,
        private readonly sessionService: SessionService) { }

  ngOnInit(): void {
    if(this.sessionService.loggedIn)
      this.router.navigate(['catalogue'])
  }

  get isLogging(): boolean {
		return this.trainerService.tryingToLog;
	}

  public onLoginClick(loginUser: NgForm){
    this.trainerService.handleLogin(loginUser, async () => {
      await this.router.navigate(['catalogue'])
    });

  }

}
