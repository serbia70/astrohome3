 import { richTextToPlainText } from 'notion-astro-loader';
 import { formatDate } from './utils';

 export const getNotionDocs = (await getCollection('notion')).map((item) => {
   return {
     id: item.id,
     body: item.rendered?.html ?? '',
     data: {
       title: richTextToPlainText(item.data.properties.title.rich_text),
       desc: richTextToPlainText(item.data.properties.desc.rich_text),
       category: item.data.properties.category.select?.name || '',
       author: richTextToPlainText(item.data.properties.author.rich_text),
       tags: item.data.properties.tags.rich_text[0].plain_text.split(','),
       image: item.data.properties.image.url,
       publishDate: item.data.properties.publishDate.created_time,
       pin: false
     },
     rendered: item.rendered,
     filePath: item.id,
     collection: item.collection,
   };
 });

export const latestPosts = [
  ...(await getCollection('doc', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  }))
  // 如果需要接入 Notion 数据源，需要将下面的注释去掉
   ...getNotionDocs
].sort((a, b) => new Date(b.data.publishDate).valueOf() - new Date(a.data.publishDate).valueOf());