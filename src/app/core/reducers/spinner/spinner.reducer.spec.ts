import * as SpinnerReducer from './spinner.reducer';
import * as SpnnerAction from '../../actions/spinner/spinner.action';

describe('SpinnerReducer', () => {
  it('should return the initial state', () => {
    expect(SpinnerReducer.reducer(undefined, {type: null})).toEqual(SpinnerReducer.initialState)
  });

  it('should handle SHOW', () => {
    const initialState: SpinnerReducer.State = {
      showing: false
    };
    const expectedState: SpinnerReducer.State = {
      showing: true
    };
    const action = new SpnnerAction.Show();
    expect(SpinnerReducer.reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle HIDE', () => {
    const initialState: SpinnerReducer.State = {
      showing: true
    };
    const expectedState: SpinnerReducer.State = {
      showing: false
    };
    const action = new SpnnerAction.Hide();
    expect(SpinnerReducer.reducer(initialState, action)).toEqual(expectedState);
  });

});
