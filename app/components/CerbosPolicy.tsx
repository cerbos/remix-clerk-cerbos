import Prism from './Prism';

export default function CerbosPolicy({
  policySource,
}: {
  policySource: {
    [filename: string]: string;
  };
}) {
  return (
    <>
      <h2>Example Cerbos Policy</h2>
      <p>A sample policy deployed with which states that:</p>
      <ul>
        <li>
          Principals with the role of <code>Admin</code> or <code>User</code> are allowed to do the{' '}
          <b>create</b> or <b>read</b> actions.
        </li>
        <li>
          Principals with the role of <code>Admin</code> are allowed to do the <b>update</b> and{' '}
          <b>delete</b> actions.
        </li>
        <li>
          Principals with the role of <code>User</code> whose ID matches the owner attribute of the
          resource are allowed to do the <b>update</b> and <b>delete</b> actions.
        </li>
      </ul>

      <Prism language="yaml" source={policySource['contact.yaml']} />
    </>
  );
}
