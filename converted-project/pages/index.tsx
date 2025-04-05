import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState("Hello from React!");

  const handleClick = () => {
    setMessage("Button clicked! 🎉");
  };

  return (
    <div>
      <Head>
        <title>Next.js Conversion</title>
        <meta name="description" content="Converted from React to Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h1>{message}</h1>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
}
