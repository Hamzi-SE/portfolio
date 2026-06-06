import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

const DATA_FILE = resolve('src/constants/portfolio-data.js');
const OUT_FILE = resolve('public/index.md');

async function writeMarkdownSnapshot() {
  const { profile, about, experiences, projects, socials } = await import(
    pathToFileURL(DATA_FILE).href + '?t=' + Date.now()
  );

  const lines = [
    `# ${profile.name} — ${profile.role}`,
    '',
    profile.tagline,
    '',
    `**Email:** ${profile.email}`,
    '',
    '---',
    '',
    '## About',
    '',
    ...about.map((p) => `${p}\n`),
    '---',
    '',
    '## Experience',
    '',
    ...experiences.flatMap((e) => [
      `### ${e.role} — [${e.company}](${e.companyUrl}) (${e.period})`,
      '',
      e.description,
      '',
      `**Stack:** ${e.stack.join(', ')}`,
      '',
    ]),
    '---',
    '',
    '## Projects',
    '',
    ...projects.flatMap((p) => {
      const lines = [`### ${p.name}`, '', p.blurb, '', `**Stack:** ${p.stack.join(', ')}`];
      if (p.href) lines.push(`  \n**Live:** ${p.href}`);
      lines.push(`  \n**Repo:** ${p.repo}`, '');
      return lines;
    }),
    '---',
    '',
    '## Contact',
    '',
    ...socials.map((s) => `- **${s.name}:** ${s.href}`),
  ];

  writeFileSync(OUT_FILE, lines.join('\n'));
}

export default function generateMarkdownSnapshot() {
  return {
    name: 'generate-markdown-snapshot',
    async buildStart() {
      await writeMarkdownSnapshot();
    },
    configureServer(server) {
      server.watcher.add(DATA_FILE);
      server.watcher.on('change', async (path) => {
        if (path === DATA_FILE) await writeMarkdownSnapshot();
      });
    },
  };
}
