import * as SpinnerAction from './spinner.action';

describe('SpinnerAction', () => {
  it('should create an action to show spinner', () => {
    const action = new SpinnerAction.Show();
    expect(action.type).toEqual(SpinnerAction.SHOW);
  });

  it('should create an action to hide spinner', () => {
    const action = new SpinnerAction.Hide();
    expect(action.type).toEqual(SpinnerAction.HIDE);
  });

});
