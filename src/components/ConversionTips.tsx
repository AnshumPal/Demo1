
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ConversionTips: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Next.js Migration Guide</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-1">File Structure</h3>
          <p className="text-sm text-muted-foreground">
            React: src/components, src/pages, src/App.js<br/>
            Next.js: pages/, components/, pages/_app.js
          </p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-1">Routing</h3>
          <p className="text-sm text-muted-foreground">
            React Router: <code>&lt;Route path="/about" element=&#123;&lt;About/&gt;&#125; /&gt;</code><br/>
            Next.js: Create <code>pages/about.js</code> file
          </p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-1">Data Fetching</h3>
          <p className="text-sm text-muted-foreground">
            React: useEffect + fetch<br/>
            Next.js: getStaticProps, getServerSideProps
          </p>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium mb-1">Client-side Code</h3>
          <p className="text-sm text-muted-foreground">
            Window/document references need <code>useEffect</code> or dynamic imports.<br/>
            <code>export default dynamic(() =&gt; import("./Component"), &#123; ssr: false &#125;)</code>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionTips;
