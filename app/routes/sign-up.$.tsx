import { SignUp } from '@clerk/remix';

export default function SignUpPage() {
  return <SignUp routing={'path'} path={'/sign-up'} signInUrl="/sign-in" />;
}
