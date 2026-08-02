import post from './documents/post';
import author from './documents/author';
import category from './documents/category';
import siteSettings from './documents/siteSettings';
import redirectDoc from './documents/redirect';
import athlete from './documents/athlete';
import sportCategory from './documents/sportCategory';
import event from './documents/event';
import mediaCategory from './documents/mediaCategory';
import mediaItem from './documents/mediaItem';
import partner from './documents/partner';
import program from './documents/program';
import homePage from './documents/homePage';
import programsPage from './documents/programsPage';
import newsroomPage from './documents/newsroomPage';
import athletesPage from './documents/athletesPage';
import eventsPage from './documents/eventsPage';
import mediaPage from './documents/mediaPage';
import contactPage from './documents/contactPage';
import storePage from './documents/storePage';
import storeLocation from './documents/storeLocation';
import productCategory from './documents/productCategory';
import product from './documents/product';

import seo from './objects/seo';
import blockContent from './objects/blockContent';
import imageBlock from './objects/imageBlock';
import videoEmbed from './objects/videoEmbed';
import calloutBlock from './objects/calloutBlock';
import ctaBlock from './objects/ctaBlock';
import newsletterBlock from './objects/newsletterBlock';
import dividerBlock from './objects/dividerBlock';
import codeBlock from './objects/codeBlock';
import statHighlight from './objects/statHighlight';
import brandColor from './objects/brandColor';
import statItem from './objects/statItem';
import socialLink from './objects/socialLink';
import pageHero from './objects/pageHero';

export const schemaTypes = [
  // Documents — Newsroom
  post, author, category,
  // Documents — Athletes
  athlete, sportCategory,
  // Documents — Events
  event,
  // Documents — Media
  mediaItem, mediaCategory,
  // Documents — Partners (now surfaced on Home + About, no dedicated page) & Programs
  partner, program,
  // Documents — Singleton pages & settings
  homePage, programsPage,
  newsroomPage, athletesPage, eventsPage, mediaPage, contactPage, storePage,
  siteSettings, redirectDoc,
  // Documents — Store
  product, productCategory, storeLocation,
  // Objects
  seo, blockContent, imageBlock, videoEmbed, calloutBlock,
  ctaBlock, newsletterBlock, dividerBlock, codeBlock, statHighlight,
  brandColor, statItem, socialLink, pageHero
];