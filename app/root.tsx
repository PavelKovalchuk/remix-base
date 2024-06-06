import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useRouteError,
  isRouteErrorResponse,
  LiveReload,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import MainNavigation from '~/components/MainNavigation';
import styles from '~/styles/main.css?url';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// will be rendered instead of App component if any error occurs
export function ErrorBoundary() {
  const error = useRouteError() as { message: string };

  // Instead of CatchBoundary
  if (isRouteErrorResponse(error)) {
    return (
      <main className="error">
        <h1>{error.statusText}</h1>
        <p>{error.data?.message || 'Something went wrong!'}</p>
        <p>
          Back to <Link to="/">safety</Link>!
        </p>
      </main>
    );
  }

  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>{error?.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}

// Reserved function name to inject styles
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
