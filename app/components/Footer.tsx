export default function Footer() {
  return (
    <footer>
      Powered by
      <a
        href="https://clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=remix_starter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/clerk.svg" alt="Clerk.dev" className="logo" />
      </a>
      +
      <a href="https://cerbos.dev" target="_blank" rel="noopener noreferrer">
        <img src="/cerbos.svg" alt="Cerbos.dev" className="logo" />
      </a>
      +
      <a href="https://remix.run/" target="_blank" rel="noopener noreferrer">
        <img src="/remix.svg" alt="Remix" className="logo" />
      </a>
    </footer>
  );
}
