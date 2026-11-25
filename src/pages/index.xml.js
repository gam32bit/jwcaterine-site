// The old Hugo site's feed lived at /index.xml; serve the same feed there so
// existing subscribers keep getting posts.
export { GET } from './rss.xml.js';
