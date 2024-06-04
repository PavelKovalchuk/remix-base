import { redirect } from '@remix-run/node';
import type { ActionFunctionArgs, LinksFunction } from "@remix-run/node"; 

import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import { getStoredNotes, storeNotes } from '~/data/notesHelpers';


// For GET request
export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
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
  return [...newNoteLinks()];
}
