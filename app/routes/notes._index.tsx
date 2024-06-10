import { redirect, ActionFunctionArgs, LinksFunction, json, MetaFunction } from '@remix-run/node';
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react';

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

export const meta: MetaFunction = () => {
  return [
    {
      title: 'All Notes',
      description: 'Manage your notes with ease.',
    },
  ];
};

export async function loader() {
  const notes = await getStoredNotes();

  if (!notes || notes.length === 0) {
    throw json(
      { message: 'Could not find any notes.' },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
  }

  return notes;
}

// Reserved function name to handle backend requests
// For non GET requests
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData) as { title: string; id: string; content: string };

  if (noteData.title.trim().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters long.' };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));

  return redirect('/notes');
}

// Reserved function name to inject styles
export const links: LinksFunction = () => {
  return [...newNoteLinks(), ...noteListLinks()];
};

/* export function CatchBoundary() {
  // const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || 'Data not found.';

  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
} */

export function ErrorBoundary() {
  const error = useRouteError() as { message: string };

  // Instead of CatchBoundary
  if (isRouteErrorResponse(error)) {
    const message = error.data?.message || 'Data not found.';

    return (
      <main>
        <NewNote />
        <p className="info-message">{message}</p>
      </main>
    );
  }

  return (
    <main className="error">
      <h1>An error related to your notes occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}
