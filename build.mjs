import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
await mkdir('dist/server', { recursive: true });
await cp('server/index.js', 'dist/server/index.js');
await cp('.openai', 'dist/.openai', { recursive: true });
const serverSource = await readFile('server/index.js', 'utf8');
const html = serverSource.match(/const html = `([\s\S]*)`;\s*export default/);
if (!html) throw new Error('Could not extract the static homepage from server/index.js');
await writeFile('dist/index.html', html[1], 'utf8');
