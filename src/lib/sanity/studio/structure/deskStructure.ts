import type { StructureResolver } from 'sanity/structure';

const singleton = (S: any, type: string, title: string) =>
  S.listItem().title(title).child(S.document().schemaType(type).documentId(type));

/**
 * Custom desk structure.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Newsroom')
        .child(
          S.list()
            .title('Newsroom')
            .items([
              S.documentTypeListItem('post').title('Articles'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors')
            ])
        ),
      S.listItem()
        .title('Athletes')
        .child(
          S.list()
            .title('Athletes')
            .items([
              S.documentTypeListItem('athlete').title('Roster'),
              S.documentTypeListItem('sportCategory').title('Sport Categories')
            ])
        ),
      S.listItem()
        .title('Events')
        .child(S.documentTypeList('event').title('Events')),
      S.listItem()
        .title('Media')
        .child(
          S.list()
            .title('Media')
            .items([
              S.documentTypeListItem('mediaItem').title('Media Items'),
              S.documentTypeListItem('mediaCategory').title('Media Categories')
            ])
        ),
      S.listItem()
        .title('Partners & Programs')
        .child(
          S.list()
            .title('Partners & Programs')
            .items([
              S.documentTypeListItem('partner').title('Partners'),
              S.documentTypeListItem('program').title('Programs')
            ])
        ),
      S.listItem()
        .title('Store')
        .child(
          S.list()
            .title('Store')
            .items([
              S.documentTypeListItem('product').title('Products'),
              S.documentTypeListItem('productCategory').title('Categories'),
              S.documentTypeListItem('storeLocation').title('Store Locations')
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Page Content')
            .items([
              singleton(S, 'homePage', 'Home Page'),
              singleton(S, 'newsroomPage', 'Newsroom Page'),
              singleton(S, 'athletesPage', 'Athletes Page'),
              singleton(S, 'eventsPage', 'Events Page'),
              singleton(S, 'mediaPage', 'Media Page'),
              singleton(S, 'programsPage', 'Programs Page'),
              singleton(S, 'storePage', 'Store Page'),
              singleton(S, 'contactPage', 'Contact Page')
            ])
        ),
      singleton(S, 'siteSettings', 'Site Settings'),
      S.listItem().title('Redirects').child(S.documentTypeList('redirect').title('Redirects')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) =>
          ![
            'post', 'category', 'author',
            'athlete', 'sportCategory',
            'event',
            'mediaItem', 'mediaCategory',
            'partner', 'program',
            'product', 'productCategory', 'storeLocation',
            'homePage', 'programsPage',
            'newsroomPage', 'athletesPage', 'eventsPage', 'mediaPage', 'contactPage', 'storePage',
            'siteSettings', 'redirect'
          ].includes(item.getId() ?? '')
      )
    ]);