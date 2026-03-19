import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenu } from '../../components/gifs-side-menu/gifs-side-menu';



@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.html',
  imports: [RouterOutlet, GifsSideMenu],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardPage { }
