import Prism from './Prism';
import Card from './Card';
import type { User } from '@clerk/remix/api.server';
import { useFetcher } from '@remix-run/react';

interface Contact {
  id: string;
  [key: string]: unknown;
}

interface Actions {
  create?: string;
  read?: string;
  update?: string;
  delete?: string;
}

interface FetcherResponse {
  requestId: string;
  results: readonly { resource: Contact; actions: Actions }[];
}

export default function APIRequest({
  user,
  role,
  getResourcesSource,
}: {
  user: User;
  role?: string;
  getResourcesSource: string;
}) {
  const resourcePermissions = useFetcher();

  const response = resourcePermissions.data as FetcherResponse;
  const tableResults = response?.results;
  const loading = resourcePermissions.state !== 'idle';

  const primaryEmailAddress = user.emailAddresses.find(
    (emailAddress) => emailAddress.id === user.primaryEmailAddressId
  )?.emailAddress;

  return (
    <>
      <h2>Demo: Access API authorized by Cerbos</h2>
      <p>
        Now that you are authenticated as <b>{primaryEmailAddress}</b> the following makes a request
        to the API endpoint of a sample CRM application. This will call Cerbos to check that you are
        authorized based on the resources being requested. The result will be returned below
        demonstrating the authorization decision from Cerbos.
      </p>

      <Card
        onClick={() => resourcePermissions.load('/get-resources')}
        title={`fetch('/api/getResources')${role ? ` as ${role}` : ''}`}
        disabled={!role}
        icon={<img slot="icon" src="/icons/server.svg" alt="" />}
        action={<img slot="action" src="/icons/download.svg" alt="" />}
      >
        <p>
          Retrieve what permissions a user has on resouces based on upon Cerbos policies. The
          backend will make an authorization call to the Cerbos instance using your Clerk identity
          and two sample resouces.
        </p>
      </Card>

      <h4>
        Response{' '}
        <i>
          You are signed in so the actions for two contact resources will be returned based on
          Cerbos policies
        </i>
      </h4>

      {tableResults ? (
        <>
          <table>
            <thead>
              <tr>
                <td>Resource</td>
                <td>Read</td>
                <td>Update</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {tableResults.map(({ resource, actions }) => (
                <tr key={resource.id}>
                  <td>{resource.id}</td>
                  <td>{actions?.read == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
                  <td>{actions?.update == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
                  <td>{actions?.delete == 'EFFECT_ALLOW' ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}

      {!response ? (
        !role ? (
          <Prism source="// You must set a role in the dropdown above" />
        ) : (
          <Prism source="// Click above to run the request" />
        )
      ) : loading ? (
        <Prism source="// Loading..." />
      ) : (
        <Prism source={JSON.stringify(response, null, 2)} language="json" />
      )}

      <h4>/app/routes/get-resources.ts</h4>

      <Prism
        source={getResourcesSource
          .replaceAll('user.id', `"${user.id}"`)
          .replaceAll('locals.session.userId', `"${user.id}"`)}
      />
    </>
  );
}
