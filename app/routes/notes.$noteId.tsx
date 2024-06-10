import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getStoredNotes } from '~/data/notesHelpers';

import styles from '~/styles/note-details.css';

export default function NoteDetailsPage() {
  const note = useLoaderData<typeof loader>();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data.title,
      description: 'Manage your notes with ease.',
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note: { id: string }) => note.id === noteId);

  if (!selectedNote) {
    throw json({ message: 'Could not find note for id ' + noteId }, { status: 404 });
  }

  return selectedNote;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
