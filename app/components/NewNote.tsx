import type { LinksFunction } from '@remix-run/node';
import { Form, useNavigation, useActionData } from '@remix-run/react';

import styles from './NewNote.css?url';

function NewNote() {
  const data = useActionData() as { message?: string };
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
  );
}

export default NewNote;

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
