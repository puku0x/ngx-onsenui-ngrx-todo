import { Action } from '@ngrx/store';

/**
 * Action names
 */
export const SHOW = '[Spinner] Show';
export const HIDE = '[Spinner] Hide';

/**
 * Show
 */
export class Show implements Action {
  readonly type = SHOW;
  constructor() {}
}

/**
 * Hide
 */
export class Hide implements Action {
  readonly type = HIDE;
  constructor() {}
}

/**
 * Actions
 */
export type Actions = Show | Hide;
