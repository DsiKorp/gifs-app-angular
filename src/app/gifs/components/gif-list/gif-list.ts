import { Component, input } from '@angular/core';
import { GifListItem } from "./gif-list-item/gif-list-item";
import { Gif } from 'src/app/gifs/interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
})
export class GifList {
  //gifs = input.required<string[]>();
  gifs = input.required<Gif[]>();


}
