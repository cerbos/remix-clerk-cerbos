import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { requireUser } from '~/utils/user';
import { cerbos } from '~/utils/cerbos.server';
import type { EmailAddress } from '@clerk/remix/api.server';

export let loader: LoaderFunction = async (args) => {
  const user = await requireUser(args);
  const roles = user.publicMetadata.role ? [user.publicMetadata.role as string] : [];
  const email =
    user.emailAddresses.find((e: EmailAddress) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? null;

  const cerbosPayload = {
    principal: {
      id: user.id,
      roles, //roles from Clerk profile
      attributes: { email },
    },
    resources: [
      {
        resource: {
          kind: 'contact',
          id: '1',
          attributes: {
            owner: user.id, // faked to demostrate ownership policy
            lastUpdated: new Date(2020, 10, 10).toISOString(),
          },
        },
        actions: ['read', 'create', 'update', 'delete'],
      },

      {
        resource: {
          kind: 'contact',
          id: '2',
          attributes: {
            owner: 'test2',
            lastUpdated: new Date(2020, 10, 10).toISOString(),
          },
        },
        actions: ['read', 'create', 'update', 'delete'],
      },
    ],
  };

  const result = await cerbos.checkResources(cerbosPayload);

  // make decisions based on the result
  // if(result.isAllowed({
  //   resource: {
  //     kind: "contact",
  //     id: "1",
  //   },
  //   action: "edit",
  // })) {
  //  ... can do edit action on resource ID 1
  // }

  // return the payload for demo purposes
  return json(result);
};
