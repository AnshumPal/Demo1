
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Code, Zap, Sparkles, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">About This Project</h1>
            <p className="text-muted-foreground">
              Your guide to transitioning from React to Next.js with the Page Router
            </p>
          </div>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                    <Code className="h-5 w-5 text-codeblue" />
                    What This Tool Does
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    This React to Next.js converter is designed to help developers migrate their existing React applications to Next.js using the Page Router approach. The tool provides:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Code transformation from React components to Next.js pages",
                      "Project structure conversion guidance",
                      "Data fetching strategy recommendations",
                      "Page Router implementation best practices",
                      "Common migration challenges and solutions"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-codepurple mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Why Next.js Page Router?
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    While Next.js now offers the App Router, the Page Router remains an essential part of the Next.js ecosystem:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Simpler migration path for traditional React applications",
                      "More established patterns and documentation",
                      "Better compatibility with existing libraries and plugins",
                      "Easier learning curve for developers new to Next.js",
                      "Stable API without breaking changes"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 text-codepurple mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-green-500" />
                    How It Works
                  </h2>
                  <p className="text-muted-foreground mb-3">
                    Our converter uses Google's Gemini AI to analyze your React code and generate equivalent Next.js code. The process:
                  </p>
                  <ol className="space-y-3">
                    <li className="flex gap-3">
                      <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                      <div>
                        <h3 className="font-medium">Input Your React Code</h3>
                        <p className="text-sm text-muted-foreground">Paste your React component or upload your project files</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                      <div>
                        <h3 className="font-medium">AI Analysis</h3>
                        <p className="text-sm text-muted-foreground">The Gemini API analyzes the code structure, routing, and data fetching patterns</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">3</div>
                      <div>
                        <h3 className="font-medium">Transformation</h3>
                        <p className="text-sm text-muted-foreground">Your code is transformed to follow Next.js Page Router conventions</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="bg-muted w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">4</div>
                      <div>
                        <h3 className="font-medium">Result & Guidance</h3>
                        <p className="text-sm text-muted-foreground">Get converted code and specific instructions for implementation</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Contribute to This Project</h2>
            <p className="text-muted-foreground mb-4">
              This converter is open source and welcomes contributions from the developer community.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Github className="mr-2 h-4 w-4" />
              <span>View on GitHub</span>
            </Button>
          </div>
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

export default About;
