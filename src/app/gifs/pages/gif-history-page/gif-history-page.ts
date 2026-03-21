import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifsService } from '../../services/gifs.service';
import { GifList } from "../../components/gif-list/gif-list";

@Component({
  selector: 'gif-history-page',
  imports: [GifList],
  templateUrl: './gif-history-page.html',
})
export default class GifHistoryPage {

  gifService = inject(GifsService);

  // query = inject(ActivatedRoute).params.subscribe(params => {
  //   console.log(params['query']);
  // });

  // dinamic arguments by url
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'] ?? 'No query')
    )
  );

  // return implicito
  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
