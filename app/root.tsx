import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { ClerkApp } from '@clerk/remix';
import { Footer, Header, CatchBoundary } from '~/components';
import globalStylesheetUrl from '~/styles/global.css';

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'New Remix App' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '/favicon.svg',
      type: 'image/svg+xml',
      as: 'image',
    },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism.css',
      as: 'style',
    },
    { rel: 'stylesheet', href: globalStylesheetUrl, as: 'style' },
  ];
};

export const loader: LoaderFunction = (args) => rootAuthLoader(args, { loadUser: true });

function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <div className="container">
          <main>
            <Outlet />
          </main>
        </div>
        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export { CatchBoundary };
export default ClerkApp(App);