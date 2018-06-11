import { Component, ViewChild, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as SpinnerAction from '../../actions';
import * as fromSpinner from '../../reducers';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new EventEmitter();

  showing$: Observable<boolean>;
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
    this.showing$ = this.store.select(fromSpinner.getSpinnerShowing);
    this.showing$
      .pipe(takeUntil(this.onDestroy$))
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
    this.onDestroy$.emit();
  }

}
