import { Action } from '@ngrx/store';

export enum SpinnerActionTypes {
  ShowSpinner = '[Spinner] Show Spinner',
  HideSpinner = '[Spinner] Hide Spinner',
}

/**
 * Show
 */
export class ShowSpinner implements Action {
  readonly type = SpinnerActionTypes.ShowSpinner;
  constructor() {}
}

/**
 * Hide
 */
export class HideSpinner implements Action {
  readonly type = SpinnerActionTypes.HideSpinner;
  constructor() {}
}

/**
 * Actions
 */
export type SpinnerActions =
    ShowSpinner
  | HideSpinner;
