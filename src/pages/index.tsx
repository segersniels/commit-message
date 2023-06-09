import Head from 'next/head';
import {
  DetailedHTMLProps,
  FormEvent,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import styles from 'styles/Home.module.css';
import Footer from 'components/Footer';
import { AiOutlineLoading } from 'react-icons/ai';

const TextArea = (
  props: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
) => {
  return <textarea className={styles.textarea} {...props} />;
};

const GenerateButton = ({
  code,
  isGenerating,
}: {
  code: string;
  isGenerating: boolean;
}) => {
  if (isGenerating) {
    return (
      <button
        type="submit"
        className={styles.button}
        disabled={!code.trim().length}
      >
        <AiOutlineLoading className="animate-spin font-bold mx-2 stroke-[3rem]" />
      </button>
    );
  }

  return (
    <button
      type="submit"
      className={styles.button}
      disabled={!code.trim().length}
    >
      Generate
    </button>
  );
};

export default function Home() {
  const [code, setCode] = useState('');
  const [context, setContext] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setIsGenerating(true);

        const response = await fetch('/api/generate', {
          method: 'POST',
          body: JSON.stringify({ code, context }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setMessage(data.message);
      } finally {
        setIsGenerating(false);
      }
    },
    [code, context]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Commit Message Generator</title>
      </Head>

      <div className={styles.wrapper}>
        <h1 className={styles.title}>Generate your commit message using ChatGPT</h1>

        <form onSubmit={handleSubmit}>
          <TextArea
            value={code}
            placeholder="Please paste a diff or code snippet here"
            onChange={(event) => setCode(event.target.value)}
            rows={10}
          />

          <TextArea
            value={context}
            placeholder="Additionally you can provide some extra context here"
            onChange={(event) => setContext(event.target.value)}
            rows={2}
          />

          <GenerateButton code={code} isGenerating={isGenerating} />
        </form>

        {message && (
          <>
            <hr className="my-4 w-64 mx-auto" />

            <div
              className={styles.message}
              onClick={() => {
                return navigator.clipboard.writeText(message);
              }}
            >
              <p>{message}</p>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
