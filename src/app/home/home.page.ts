import { Component, OnInit } from '@angular/core';
import { Pacient } from '../models/Pacient';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public pacients: Pacient[] = [
    new Pacient(
      'Summers', 'Scott', '1963-09-01', 1.8, 'Wetchester', 39.8755,-75.6710, 0
    ),
    new Pacient(
      'Grey', 'Jean', '1963-09-01', 1.8, 'Wetchester', 43.6534,-87.7282, 1
    ),    new Pacient(
      'MacCoy', 'Henry', '1963-09-01', 1.8, 'Wetchester', 35.2702,136.9892, 2
    ),
    new Pacient(
      'Drake', 'Robert', '1963-09-01', 1.8, 'Wetchester', 35.6727,139.6950, 3
    ),
    new Pacient(
      'Worthington', 'Warren', '1963-09-01', 1.8, 'Wetchester', -2.103767,-79.902837, 4
    )
  ]; 
  constructor() { }

  ngOnInit() {
  }

}
