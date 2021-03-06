# Connect4

I carried out this project following my internship request at [Infomaniak](https://www.infomaniak.com/fr) (Geneva).  
You can also find this project following this link (Heroku Web Server) : **https://connect4-rh-trainees.herokuapp.com/**.  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3. 

## The game

It is a basic Connect4 2 players game.  
The aim is to align 4 pawns of the same color, either vertically, horizontally, or diagonally.  
The first player to align 4 of his pawns wins.  

## This project

You have a menu where you can choose between seeing the rules or playing.  
The first step is to enter 2 pseudos. They have to be different, otherwise an error message appears. Then you have to choose which player is going to play with the red pawns (and the yellow's). 
The red player starts.  
To play, you have to click on the play button under the colomn you want to play in.  
When there is a winner, the game stops and the name of the winner is displayed. If there is no winner and no empty box left, then the game end up in a tie.  
You can then restart a game by clicking on the button "play again".  

## Features

This project includes a Dark/Light mode.  
First, the script checks if the user has an overwrite for his OS default prefered color in his localStorage. If it is not the case, the script checks if the browser supports prefers-color-scheme and loads it. If it doesn't,  the default setting is turn to dark.  
Also, you can choose your mode by clicking the menu icon of the right top.  

## Web Server 

I had to publish my project on a Web Server. I deployed it on the [Heroku Web Server](https://www.heroku.com). Here is the [link](https://connect4-rh-trainees.herokuapp.com/).  
I succeeded by following [this tutorial](https://grokonez.com/frontend/angular/angular-deployment/how-to-deploy-angular-application-on-heroku-hosting-with-git-repository).

## Improvements 

It could be interesting to add an option that can put the game on pause (maybe with NGXS).   
Also, implementing an AI would be great as well as an online multiplayers game option.   

## Development server

Run `npm install` then `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
