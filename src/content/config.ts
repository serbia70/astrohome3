...
 import { notionLoader } from 'notion-astro-loader';

...
 export const NotionDocs = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.NOTION_TOKEN,
    database_id: import.meta.env.NOTION_DATABASE_ID
  })
});

export const collections = {
  doc: Docs,
  notion: NotionDocs
};
