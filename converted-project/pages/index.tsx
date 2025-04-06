
import Head from 'next/head';

function HomePage({ post }) {
  // Render the post data received from getServerSideProps
  return (
    <div>
      <Head>
        <title>Next.js Data Fetching Example</title>
        <meta name="description" content="Next.js example using getServerSideProps" />
      </Head>
      <h2>Post Data:</h2>
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

// Fetch data server-side using getServerSideProps
export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post = await res.json();

  // Pass data to the page via props
  return { props: { post } };
}

export default HomePage;