import fs from 'fs/promises';

export async function getStoredNotes() {
  const rawFileContent = await fs.readFile('notesDB.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.notes ?? [];
  return storedNotes;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function storeNotes(notes: any[]) {
  await fs.writeFile('notesDB.json', JSON.stringify({ notes: notes || [] }));
  return;
}
