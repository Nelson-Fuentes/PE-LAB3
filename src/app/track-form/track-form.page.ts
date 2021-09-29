import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";


@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.page.html',
  styleUrls: ['./track-form.page.scss'],
})
export class TrackFormPage implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  save(){
    /**
     * Save proceess
     */
    this.location.back();
  }

}
