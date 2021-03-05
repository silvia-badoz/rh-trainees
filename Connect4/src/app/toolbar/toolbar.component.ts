import { Component, OnInit } from '@angular/core';
import { ColorSchemeService } from 'src/app/services/color-scheme-service.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
title = 'Connect4';

  constructor(private colorSchemeService: ColorSchemeService) { 
    this.colorSchemeService.load();
  }

  ngOnInit(): void {
  }

}
