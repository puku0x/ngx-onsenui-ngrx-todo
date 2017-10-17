import * as fromSpinner from './spinner.reducer';
import * as SpnnerAction from '../../actions/spinner/spinner.action';

describe('fromSpinner', () => {
  it('should return the initial state', () => {
    expect(fromSpinner.reducer(undefined, {type: null})).toEqual(fromSpinner.initialState)
  });

  it('should handle SHOW', () => {
    const initialState: fromSpinner.State = {
      showing: false
    };
    const expectedState: fromSpinner.State = {
      showing: true
    };
    const action = new SpnnerAction.Show();
    expect(fromSpinner.reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle HIDE', () => {
    const initialState: fromSpinner.State = {
      showing: true
    };
    const expectedState: fromSpinner.State = {
      showing: false
    };
    const action = new SpnnerAction.Hide();
    expect(fromSpinner.reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle selectors', () => {
    const state = {
      spinner: {
        showing: true
      }
    };
    expect(fromSpinner.getShowing(state)).toEqual(state.spinner.showing);
  });

});
