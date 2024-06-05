import { redirect } from '@remix-run/node';
import type { ActionFunctionArgs, LinksFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { INote, links as noteListLinks } from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '~/data/notesHelpers';

// For GET request
export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes as INote[]} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

// Reserved function name to handle backend requests
// For non GET requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add validation...
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect('/notes');
}

// Reserved function name to inject styles
export const links: LinksFunction = () => {
  return [...newNoteLinks(), ...noteListLinks()];
};
