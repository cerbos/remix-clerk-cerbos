import { useLoaderData } from '@remix-run/react';
import { data } from '@remix-run/node';
import type { LoaderFunction, LinksFunction } from '@remix-run/node';
import documentsStylesheetUrl from '~/styles/documents.css';
import { Prism, CatchBoundary } from '~/components';
import { getDocumentById, getDocumentAttributesById } from '~/db';
import { requireUser } from '~/utils/user';
import { cerbos } from '~/utils/cerbos.server';

type Doc = Exclude<Awaited<ReturnType<typeof getDocumentById>>, undefined>;

export let loader: LoaderFunction = async (args) => {
  // fetch the user from the session
  const user = await requireUser(args);

  // cerbos requires an array of `roles` so we just wrap `role` in an array
  const roles = user.publicMetadata.role ? [user.publicMetadata.role as string] : [];
  const { params } = args;
console.log({user : user.publicMetadata});
  if (!params.id) {
    throw data({ error: 'Document ID required' }, { status: 400 });
  }

  // query for the minimal infomation needed to pass to cerbos for an authorization check
  const documentAttrs = await getDocumentAttributesById(params.id);

  // if we can't find a document matching the route param id, throw a 404
  if (!documentAttrs) {
    throw data({ error: 'Not Found' }, { status: 404 });
  }

  // ** fake the ownership of the document for the purposes of this demo **
  if (documentAttrs?.author === 'tbd') {
    documentAttrs.author = user.id;
  }

  const isAllowed = await cerbos.isAllowed({
    principal: { id: user.id, roles },
    resource: {
      kind: 'document',
      id: params.id,
      attributes: documentAttrs,
    },
    action: 'view',
  });

  if (!isAllowed) {
    throw data({ error: 'Forbidden' }, { status: 403 });
  }

  // get the full document for the page
  const document = await getDocumentById(params.id);

  return document;
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: documentsStylesheetUrl }];
};

export default function DocumentRoute() {
  const data = useLoaderData() as Doc;

  return (
    <div className="document">
      <h1>{data.title}</h1>
      <p>{data.blurb}</p>
      {data.icon ? <img src={`/icons/${data.icon}.svg`} alt="" /> : null}

      <h4>The load function for this document page:</h4>
      <Prism
        source={`export let loader: LoaderFunction = async (args) => {
  // fetch the user from the session
  const user = await requireUser(args);

  // cerbos requires an array of \`roles\` so we just wrap \`role\` in an array
  const roles = user.publicMetadata.role ? [user.publicMetadata.role as string] : [];
  const { params } = args;

  if (!params.id) {
    throw json('Document ID required', { status: 400 });
  }

  // query for the minimal infomation needed to pass to cerbos for an authorization check
  const documentAttrs = await getDocumentAttributesById(params.id);

  // if we can't find a document matching the route param id, throw a 404
  if (!documentAttrs) {
    throw json('Not Found', { status: 404 });
  }

  // ** fake the ownership of the document for the purposes of this demo **
  if (documentAttrs?.author === 'tbd') {
    documentAttrs.author = user.id;
  }

  const isAllowed = await cerbos.isAllowed({
    principal: { id: user.id, roles },
    resource: {
      kind: 'document',
      id: params.id,
      attributes: documentAttrs,
    },
    action: 'view',
  });

  if (!isAllowed) {
    throw json('Forbidden', { status: 403 });
  }

  // get the full document for the page
  const document = await getDocumentById(params.id);

  return json(document);
};
`}
      />
    </div>
  );
}
