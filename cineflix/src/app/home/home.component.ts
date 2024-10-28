import { Component } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, CardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
