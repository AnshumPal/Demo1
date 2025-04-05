import Head from 'next/head';

function HomePage() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="A simple Next.js app" />
      </Head>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Hello, Next.js 🚀</h1>
        <p>Welcome to your first Next.js page!</p>
      </div>
    </div>
  );
}

export default HomePage;

