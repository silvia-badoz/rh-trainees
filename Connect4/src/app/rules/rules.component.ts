import { Component, OnInit } from '@angular/core';
import { ColorSchemeService } from 'src/app/services/color-scheme-service.service';


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  constructor(private colorSchemeService: ColorSchemeService) {
    this.colorSchemeService.load();
   }

  ngOnInit(): void {
  }

}
