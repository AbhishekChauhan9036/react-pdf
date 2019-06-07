import * as R from 'ramda';

import Font from '../font';
import save from './save';
import restore from './restore';
import isText from '../node/isText';
import isPage from '../node/isPage';
import isImage from '../node/isImage';
import isNote from '../node/isNote';
import isLink from '../node/isLink';
import isCanvas from '../node/isCanvas';
import renderText from './renderText';
import renderPage from './renderPage';
import renderLink from './renderLink';
import renderNote from './renderNote';
import renderImage from './renderImage';
import renderCanvas from './renderCanvas';
import addMetadata from './addMetadata';
import renderDebug from './renderDebug';
import renderBorders from './renderBorders';
import renderBackground from './renderBackground';
import applyTransformations from './applyTransformations';

const isNotText = R.complement(isText);

const renderNode = ctx => node => {
  const renderChildren = R.tap(
    R.compose(
      R.forEach(renderNode(ctx)),
      R.pathOr([], ['children']),
    ),
  );

  return R.compose(
    restore(ctx),
    renderDebug(ctx),
    R.when(isNotText, renderChildren),
    R.cond([
      [isText, renderText(ctx)],
      [isLink, renderLink(ctx)],
      [isNote, renderNote(ctx)],
      [isImage, renderImage(ctx)],
      [isCanvas, renderCanvas(ctx)],
      [R.T, R.identity],
    ]),
    renderBorders(ctx),
    renderBackground(ctx),
    applyTransformations(ctx),
    save(ctx),
    R.when(isPage, renderPage(ctx)),
  )(node);
};

const renderDocument = ctx =>
  R.compose(
    R.forEach(renderNode(ctx)),
    R.pathOr([], ['children']),
  );

const renderRoot = ctx =>
  R.compose(
    R.forEach(renderDocument(ctx)),
    R.pathOr([], ['children']),
  );

const render = (ctx, root) => {
  addMetadata(ctx)(root);
  renderRoot(ctx)(root);

  ctx.end();
  Font.reset();

  return ctx;
};

export default render;
