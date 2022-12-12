import { Form } from '@remix-run/react';
import type { FormEvent } from 'react';

export default function RoleSelect({
  onRoleChange,
  role,
  loading,
}: {
  onRoleChange: (event: FormEvent<HTMLSelectElement>) => void;
  role?: string;
  loading?: boolean;
}) {
  return (
    <>
      <h2>Demo: Set your Role</h2>
      <p>
        For this demo set a role on your Clerk user - this is stored in the publicMetadata field of
        your user profile and passed into Cerbos for use in authorization.
      </p>
      <Form method="post" replace>
        <select
          name="role"
          className="role-select"
          defaultValue={role}
          onInput={onRoleChange}
          disabled={loading}
        >
          {!role ? <option value="">Select a role</option> : null}
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </Form>
      <p>
        Once you change the role, re-run the below request to see the impact on the authorization
        result.
      </p>
    </>
  );
}
