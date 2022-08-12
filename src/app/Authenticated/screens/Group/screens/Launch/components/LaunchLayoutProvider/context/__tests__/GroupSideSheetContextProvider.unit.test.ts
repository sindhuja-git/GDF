import {
  reducer,
  SideSheetTab,
  SideSheetActions,
} from '../LaunchSideSheetContextProvider';

/**
 * ! We are only testing the reducer here as the component functionality is tested as part of other integration tests. Such as Launch.js
 */

describe('LaunchSideSheetContextProvider reducer tests', () => {
  test('when invalid action runs throws invalid action error', () => {
    const action = {
      type: 'Invalid',
    };

    expect(() =>
      reducer(null, (action as unknown) as SideSheetActions)
    ).toThrow('Invalid Action Type');
  });

  test('when action is Files, set state to SideSheetTab.Files', () => {
    const action = {
      type: SideSheetTab.Files,
    };

    expect(reducer(null, action)).toBe(SideSheetTab.Files);
  });

  test('when action is Attachments, set state to SideSheetTab.Attachments', () => {
    const action = {
      type: SideSheetTab.Attachments,
    };

    expect(reducer(null, action)).toBe(SideSheetTab.Attachments);
  });

  test('when action is Comments, set state to SideSheetTab.Comments', () => {
    const action = {
      type: SideSheetTab.Comments,
    };

    expect(reducer(null, action)).toBe(SideSheetTab.Comments);
  });
});
