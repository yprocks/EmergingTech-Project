import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  loading: boolean;

  constructor(private _authService: AuthService) {
    this.loading = true;

  }

  ngOnInit() {
    this.loading = false;
  }

}
