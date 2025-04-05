import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { FileJson, FileCode, LayoutPanelLeft, Plug, Server } from 'lucide-react';

const Guide = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Next.js Conversion Guide</h1>
            <p className="text-muted-foreground">
              Complete steps to migrate from React to Next.js Page Router
            </p>
          </div>
          
          <Tabs defaultValue="basics" className="mb-10">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="routing">Routing</TabsTrigger>
              <TabsTrigger value="data">Data Fetching</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="basics">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileJson className="h-5 w-5 text-codeblue" />
                      Setting Up Your Next.js Project
                    </CardTitle>
                    <CardDescription>
                      How to initialize and configure a Next.js application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Initialize a New Next.js Project</h3>
                      <div className="bg-card border border-border rounded-md p-3">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
                          {`# Create a new Next.js project
npx create-next-app@latest my-nextjs-app

# Or convert an existing React project
npm install next react react-dom`}
                        </pre>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Configure package.json</h3>
                      <div className="bg-card border border-border rounded-md p-3">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
{`{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^13.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Folder Structure</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Create the following directory structure for your Next.js app:
                      </p>
                      <div className="bg-card border border-border rounded-md p-3">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
{`my-nextjs-app/
  ├── pages/          # Each file becomes a route
  │   ├── _app.js     # Custom App component
  │   ├── _document.js # Custom Document component
  │   ├── index.js    # Home page (/)
  │   └── about.js    # About page (/about)
  ├── public/         # Static assets
  ├── styles/         # CSS files
  ├── components/     # React components
  ├── lib/            # Utility functions
  ├── next.config.js  # Next.js configuration
  └── package.json    # Project dependencies`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="routing">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LayoutPanelLeft className="h-5 w-5 text-codepurple" />
                      Converting React Router to Next.js
                    </CardTitle>
                    <CardDescription>
                      How to migrate your routing system to Next.js Pages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">React Router vs Next.js Routing</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-2 text-codeblue">React Router</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`// routes.js
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/blog/:id" element={<BlogPost />} />
</Routes>`}
                          </pre>
                        </div>
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-2 text-codepurple">Next.js Pages</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`// File system based routing:
pages/
  index.js         // → /
  about.js         // → /about
  blog/
    [id].js        // → /blog/:id`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Navigation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-2 text-codeblue">React Router</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`import { Link, useNavigate } from 'react-router-dom';

// Declarative
<Link to="/about">About</Link>

// Imperative
const navigate = useNavigate();
navigate('/about');`}
                          </pre>
                        </div>
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-2 text-codepurple">Next.js</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`import Link from 'next/link';
import { useRouter } from 'next/router';

// Declarative
<Link href="/about">About</Link>

// Imperative
const router = useRouter();
router.push('/about');`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Route Parameters</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-2 text-codeblue">React Router</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  return <div>Blog Post {id}</div>;
}`}
                          </pre>
                        </div>
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-2 text-codepurple">Next.js</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`// pages/blog/[id].js
import { useRouter } from 'next/router';

function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  return <div>Blog Post {id}</div>;
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="data">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-green-500" />
                      Data Fetching Strategies
                    </CardTitle>
                    <CardDescription>
                      How to convert API calls to Next.js data fetching methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">React vs Next.js Data Fetching</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-2 text-codeblue">React</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`import { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  return <div>{data ? <div>{data.title}</div> : 'Loading...'}</div>;
}`}
                          </pre>
                        </div>
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-2 text-codepurple">Next.js</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`// pages/my-page.js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return { props: { data } };
}

function MyPage({ data }) {
  return <div>{data.title}</div>;
}

export default MyPage;`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Next.js Data Fetching Methods</h3>
                      <div className="space-y-3">
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-1 text-codepurple">getStaticProps (Static Generation)</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Fetch data at build time. Good for pages that can be pre-rendered ahead of user requests.
                          </p>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return {
    props: { posts },
    revalidate: 60 // Optional: regenerate page after 60 seconds
  };
}`}
                          </pre>
                        </div>
                        
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-1 text-codepurple">getServerSideProps (Server-side Rendering)</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Fetch data on each request. Good for pages that need to show frequently updated data.
                          </p>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`export async function getServerSideProps(context) {
  const { req, params, query } = context;
  const res = await fetch(\`https://api.example.com/posts/\${query.id}\`);
  const post = await res.json();
  
  return { props: { post } };
}`}
                          </pre>
                        </div>
                        
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-1 text-codepurple">getStaticPaths (Dynamic Routes)</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Specify which dynamic routes to pre-render for getStaticProps.
                          </p>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`// pages/posts/[id].js
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  const paths = posts.map(post => ({
    params: { id: post.id.toString() }
  }));
  
  return { paths, fallback: 'blocking' };
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="deployment">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plug className="h-5 w-5 text-amber-500" />
                      Configuration & Deployment
                    </CardTitle>
                    <CardDescription>
                      Final steps to configure and deploy your Next.js application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">next.config.js</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Configure Next.js behavior with a next.config.js file:
                      </p>
                      <div className="bg-card border border-border rounded-md p-3">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
{`/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.example.com'],
  },
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
  env: {
    // Environment variables
    ANALYTICS_ID: process.env.ANALYTICS_ID,
  },
}

module.exports = nextConfig`}
                        </pre>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Custom _app.js</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Convert your React app's main wrapper component to Next.js _app.js:
                      </p>
                      <div className="bg-card border border-border rounded-md p-3">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
{`// pages/_app.js
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp`}
                        </pre>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Environment Variables</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Next.js provides built-in support for environment variables:
                      </p>
                      <div className="bg-card border border-border rounded-md p-3">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
{`# .env.local (for local development)
API_KEY=your-api-key

# .env.production (for production)
API_KEY=production-api-key

# In your Next.js code
// Accessible on server-side only
console.log(process.env.API_KEY);

// To expose to browser add NEXT_PUBLIC_ prefix
// .env.local
NEXT_PUBLIC_ANALYTICS_ID=123

// Accessible in browser
console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);`}
                        </pre>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Deployment</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Deploy your Next.js application:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-1">Vercel (Recommended)</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo to Vercel
# for automatic deployments`}
                          </pre>
                        </div>
                        <div className="border border-border rounded-md p-3">
                          <h4 className="font-medium mb-1">Self-hosting</h4>
                          <pre className="text-sm font-mono whitespace-pre-wrap">
{`# Build the application
npm run build

# Start the production server
npm start

# Or using Docker:
# Create a Dockerfile with Next.js
# configuration and deploy to any
# hosting platform that supports
# Docker containers`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>© {new Date().getFullYear()} React to Next.js Converter • Powered by Gemini</p>
        </div>
      </footer>
    </div>
  );
};

export default Guide;
