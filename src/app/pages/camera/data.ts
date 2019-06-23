import { Injectable } from '@angular/core';

@Injectable()
export class data{
    calories: number;
    constructor(){
        this.calories = 500;
    }
}