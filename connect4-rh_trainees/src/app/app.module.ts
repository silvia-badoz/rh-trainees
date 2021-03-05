/* MODULES */ 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  /* Angular Material */
import { MatToolbarModule } from '@angular/material/toolbar';
//import {MatTableModule} from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'; 

  /* NGXS */
//import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

/* COMPONENTS */ 
import { AppComponent } from './app.component';
import { RulesComponent } from './rules/rules.component';
import { ChoiceComponent } from './choice/choice.component';
import { PlayerComponent } from './game/player/player.component';
import { GridComponent } from './game/grid/grid.component';
import { ErrComponent } from './game/err/err.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ColorCaseComponent } from './game/color-case/color-case.component';
import { environment } from 'src/environments/environment';

  /* dark/light mode */
import { SettingChangeColorSchemeComponent } from './settings/setting-change-color-scheme/setting-change-color-scheme.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    RulesComponent,
    ChoiceComponent,
    PlayerComponent,
    GridComponent,
    ErrComponent,
    ToolbarComponent,
    ColorCaseComponent,
    SettingChangeColorSchemeComponent
  ],
  entryComponents: [ErrComponent, RulesComponent], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, 
    FormsModule,
    MatDialogModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

