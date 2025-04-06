import Head from 'next/head';
import { GetServerSideProps } from 'next';

interface Post {
  title: string;
  body: string;
}

interface Props {
  post: Post;
}

const HomePage = ({ post }: Props) => {
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
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export default HomePage;
