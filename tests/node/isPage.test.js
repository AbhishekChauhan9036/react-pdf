import isPage from '../../src/node/isPage';
import {
  VIEW,
  TEXT,
  LINK,
  PAGE,
  NOTE,
  IMAGE,
  DOCUMENT,
  CANVAS,
  TEXT_INSTANCE,
} from '../../src/constants';

describe('node isPage', () => {
  test('Should return false for view', () => {
    const node = { type: VIEW };
    expect(isPage(node)).toBeFalsy();
  });

  test('Should return false for text', () => {
    const node = { type: TEXT };
    expect(isPage(node)).toBeFalsy();
  });

  test('Should return false for link', () => {
    const node = { type: LINK };
    expect(isPage(node)).toBeFalsy();
  });

  test('Should return false for note', () => {
    const node = { type: NOTE };
    expect(isPage(node)).toBeFalsy();
  });

  test('Should return false for image', () => {
    const node = { type: IMAGE };
    expect(isPage(node)).toBeFalsy();
  });

  test('Should return false for document', () => {
    const node = { type: DOCUMENT };
    expect(isPage(node)).toBeFalsy();
  });

  test('Should return false for canvas', () => {
    const node = { type: CANVAS };
    expect(isPage(node)).toBeFalsy();
  });

  test('Should return true for page', () => {
    const node = { type: PAGE };
    expect(isPage(node)).toBeTruthy();
  });

  test('Should return false for text instance', () => {
    const node = { type: TEXT_INSTANCE };
    expect(isPage(node)).toBeFalsy();
  });
});