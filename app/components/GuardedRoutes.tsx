import Card from './Card';

export default function GuardedRoutes({ disabled }: { disabled: boolean }) {
  return (
    <>
      <h2>Demo: Guarded Routes</h2>
      <p>
        For this demo set a <b>role</b> on your Clerk user above and attempt to access the routes
        below. The
        <code>admin</code> role has access to all routes, while the <code>user</code> role only has
        access to the user route.
      </p>
      <div className="cards">
        <Card
          href="/documents/1"
          title="A Route the Admin user role can access"
          disabled={disabled}
          icon={<img slot="icon" src="/icons/lock.svg" alt="" />}
          action={<img slot="action" src="/icons/arrow-right.svg" alt="" />}
        >
          <p>
            This route is <b>only</b> accessible by users with the <code>admin</code> role.
          </p>
        </Card>

        <Card
          href="/documents/2"
          title="A Route the user who owns the resource can access"
          disabled={disabled}
          icon={<img slot="icon" src="/icons/external-link.svg" alt="" />}
          action={<img slot="action" src="/icons/arrow-right.svg" alt="" />}
        >
          <p>
            This route is "guarded" by the <code>id</code> of the user matching the{' '}
            <code>author</code>
            property of the <b>document</b> resource.
          </p>
        </Card>

        <Card
          href="/documents/3"
          title="A Route the user does not own"
          disabled={disabled}
          icon={<img slot="icon" src="/icons/document.svg" alt="" />}
          action={<img slot="action" src="/icons/arrow-right.svg" alt="" />}
        >
          <p>
            This route is "guarded" by the <code>id</code> of the <code>author</code> of the{' '}
            <b>document</b> resource.
          </p>
        </Card>
      </div>
    </>
  );
}
