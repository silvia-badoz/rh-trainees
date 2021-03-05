import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ColorSchemeService } from 'src/app/services/color-scheme-service.service';

@Component({
    selector: 'app-setting-change-color-scheme',
    templateUrl: './setting-change-color-scheme.component.html',
    styleUrls: ['./setting-change-color-scheme.component.scss']
})
export class SettingChangeColorSchemeComponent {

    public themes = [
        {
            name: 'dark',
            icon: 'brightness_3'
        },
        {
            name: 'light',
            icon: 'wb_sunny'
        }
    ];

    constructor(public colorSchemeService: ColorSchemeService) {
    }

    setTheme(theme: string) {
        this.colorSchemeService.update(theme);
    }

}
