import { Component } from '@angular/core';
import { GifsSideMenuOptions } from './gifs-side-menu-options/gifs-side-menu-options';
import { GifsSideMenuHeader } from './gifs-side-menu-header/gifs-side-menu-header';

@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuHeader, GifsSideMenuOptions],
  templateUrl: './gifs-side-menu.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenu { }
