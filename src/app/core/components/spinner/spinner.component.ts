import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import * as SpinnerAction from '../../../store/actions/spinner/spinner.action';
import * as fromSpinner from '../../../store/reducers/spinner/spinner.reducer';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  showing$: Observable<boolean>;
  onDestroy = new Subject();
  @ViewChild('modal') modal;

  /**
   * Constructor
   * @param store
   */
  constructor(
    private store: Store<fromSpinner.State>
  ) { }

  /**
   * Initialize
   */
  ngOnInit() {
    this.showing$ = this.store.select(fromSpinner.getShowing);
    this.showing$
      .takeUntil(this.onDestroy)
      .subscribe(showing => {
        if (showing === true) {
          this.modal.nativeElement.show();
        } else {
          this.modal.nativeElement.hide();
        }
      });
  }

  /**
   * Finalize
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

}
