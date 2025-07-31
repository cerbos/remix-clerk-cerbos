import PrismModule from 'prismjs';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-json.js';

export default function Prism({
  source = `console.log('Hello world')`,
  language = 'javascript',
}: {
  source?: string;
  language?: string;
}) {
  const html = PrismModule.highlight(source, PrismModule.languages[language], language);

  return (
    <pre className={`language-${language}`} tabIndex={0}>
      <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: html }}></code>
    </pre>
  );
}
