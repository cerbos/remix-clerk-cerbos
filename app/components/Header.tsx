import { SignedIn, SignedOut, UserButton } from '@clerk/remix';
import { Link } from '@remix-run/react';

export default function Header() {
  return (
    <header>
      <div className="left">
        <a className="logo" href="/">
          <img src="/cerbie.svg" width="32" height="32" alt="Logo" />
          <span className="appName">Remix App: Cerbos + Clerk Demo</span>
        </a>
      </div>
      <div className="right">
        <SignedIn>
          <UserButton signInUrl="/sign-in" />
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in">Sign in</Link>
        </SignedOut>
      </div>
    </header>
  );
}
