import { Todo } from '../../models';
import { SpinnerActions, SpinnerActionTypes, ShowSpinner, HideSpinner } from '../actions';
import { reducer, initialState, State } from './spinner.reducer';

describe('Spinner Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('Spinner action', () => {
    it('should handle ShowSpinner', () => {
      const initial: State = {
        showing: false
      };
      const expected: State = {
        ...initial,
        showing: true
      };
      const action = new ShowSpinner();
      expect(reducer(initial, action)).toEqual(expected);
    });

    it('should handle HideSpinner', () => {
      const initial: State = {
        showing: true
      };
      const expected: State = {
        ...initial,
        showing: false
      };
      const action = new HideSpinner();
      expect(reducer(initial, action)).toEqual(expected);
    });
  });
});
