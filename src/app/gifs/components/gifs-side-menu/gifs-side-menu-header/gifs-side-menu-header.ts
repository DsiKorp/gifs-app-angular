import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [NgOptimizedImage],
  templateUrl: './gifs-side-menu-header.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsSideMenuHeader {
  envs = environment;
}
