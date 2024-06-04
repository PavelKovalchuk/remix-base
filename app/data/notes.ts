import fs from 'fs/promises';

export async function getStoredNotes() {
  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function storeNotes(notes: any[]) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }));
}
