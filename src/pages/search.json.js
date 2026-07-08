import { getCollection } from 'astro:content';

// Full-text index for the blog listing's client-side search. Body text is the
// raw markdown source with MDX imports and markup syntax stripped down to
// plain words — good enough for substring matching, tiny at this post count.
export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const index = posts.map((post) => ({
    id: post.id,
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags,
    body: (post.body ?? '')
      .replace(/^import\s.*$/gm, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[#>*_`~|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  }));
  return Response.json(index);
}
