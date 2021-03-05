import { Component } from '@angular/core';
import { ColorSchemeService } from 'src/app/services/color-scheme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Connect4';

  constructor(private colorSchemeService: ColorSchemeService) {
    this.colorSchemeService.load();
  }

}
