import type { LinksFunction } from "@remix-run/node";

import styles from './NewNote.css?url';

function NewNote() {
  return (
    <form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button type="submit">Add Note</button>
      </div>
    </form>
  );
}

export default NewNote;


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];
