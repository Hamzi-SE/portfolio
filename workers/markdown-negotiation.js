export default {
  async fetch(request) {
    const accept = request.headers.get('Accept') || '';

    if (!accept.includes('text/markdown')) {
      return fetch(request);
    }

    const url = new URL(request.url);
    const mdUrl = new URL('/index.md', url.origin);

    const mdResponse = await fetch(mdUrl.toString());
    if (!mdResponse.ok) {
      return fetch(request);
    }

    const markdown = await mdResponse.text();
    const tokens = Math.ceil(markdown.length / 4);

    return new Response(markdown, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': String(tokens),
        'Vary': 'Accept',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    });
  },
};
