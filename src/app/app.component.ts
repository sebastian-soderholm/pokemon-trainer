import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //Add app-root styles to global scope
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'pokemon-trainer';
}
