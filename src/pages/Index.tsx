
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import CodeEditor from '@/components/CodeEditor';
import FileUploader from '@/components/FileUploader';
import ConversionTips from '@/components/ConversionTips';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { convertCodeToNextJs, convertProjectStructure, NextJsFile } from '@/lib/gemini-api';
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedFiles, setConvertedFiles] = useState<NextJsFile[] | undefined>(undefined);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  const handleConvertCode = async () => {
    if (!inputCode.trim()) {
      toast({
        variant: "destructive",
        title: "No code provided",
        description: "Please enter React code to convert.",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setConvertedFiles(undefined);
    setDebugInfo(null);
    
    try {
      toast({
        title: "Starting conversion",
        description: "Converting your React code to pure Next.js with advanced optimizations. This may take a moment...",
        duration: 5000,
      });
      
      // Add a slight delay to make the preview effect more noticeable
      setTimeout(async () => {
        try {
          console.log("Converting code...");
          const result = await convertCodeToNextJs(inputCode);
          console.log("Conversion result:", result);
          
          if (result.success) {
            if (result.files && result.files.length > 0) {
              setConvertedFiles(result.files);
              setDebugInfo(`Successfully generated ${result.files.length} Next.js files.`);
              toast({
                title: "Conversion complete",
                description: `Successfully created ${result.files.length} Next.js files with optimized functionality`,
                duration: 5000,
              });
            } else {
              // Handle case when files array is empty but success is true
              setError("No files were generated. The conversion may have succeeded but produced no output.");
              setDebugInfo("API returned success but no files were generated.");
              toast({
                variant: "destructive",
                title: "Incomplete conversion",
                description: "No files were generated. Please try a different code sample.",
                duration: 5000,
              });
            }
            setOutputCode(result.output);
          } else {
            setError(result.error || "Failed to convert code. Please try again with a different sample.");
            setDebugInfo(`API Error: ${result.error || "Unknown error"}`);
            toast({
              variant: "destructive",
              title: "Conversion failed",
              description: result.error || "Failed to convert code. Please try again.",
              duration: 5000,
            });
          }
        } catch (err) {
          console.error("Conversion error:", err);
          const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
          setError(`Error: ${errorMessage}`);
          setDebugInfo(`Exception: ${errorMessage}`);
          toast({
            variant: "destructive",
            title: "Conversion error",
            description: errorMessage,
            duration: 5000,
          });
        } finally {
          setIsLoading(false);
        }
      }, 1500);
    } catch (error) {
      console.error("Initial error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Error: ${errorMessage}`);
      setDebugInfo(`Initial exception: ${errorMessage}`);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        duration: 5000,
      });
    }
  };

  const handleProjectConversion = async (projectStructure: string) => {
    if (!projectStructure.trim()) {
      toast({
        variant: "destructive",
        title: "No project structure provided",
        description: "Please upload a project to convert.",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setConvertedFiles(undefined);
    setDebugInfo(null);
    
    try {
      toast({
        title: "Starting project conversion",
        description: "Converting your React project to pure Next.js structure with advanced optimizations. This may take a moment...",
        duration: 5000,
      });
      
      const result = await convertProjectStructure(projectStructure);
      console.log("Project conversion result:", result);
      
      if (result.success) {
        if (result.files && result.files.length > 0) {
          setConvertedFiles(result.files);
          setDebugInfo(`Successfully generated ${result.files.length} Next.js project files.`);
          toast({
            title: "Project conversion complete",
            description: `Successfully created ${result.files.length} Next.js files with optimized functionality`,
            duration: 5000,
          });
        } else {
          setError("No files were generated. The conversion may have succeeded but produced no output.");
          setDebugInfo("API returned success but no project files were generated.");
          toast({
            variant: "destructive",
            title: "Incomplete project conversion",
            description: "No files were generated. Please try a different project structure.",
            duration: 5000,
          });
        }
        setOutputCode(result.output);
      } else {
        setError(result.error || "Failed to convert project. Please try again.");
        setDebugInfo(`Project API Error: ${result.error || "Unknown error"}`);
        toast({
          variant: "destructive",
          title: "Project conversion failed",
          description: result.error || "Failed to convert project. Please try again.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Project conversion error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(`Error: ${errorMessage}`);
      setDebugInfo(`Project exception: ${errorMessage}`);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-medium mb-2">
              React to Next.js Converter
            </h1>
            <p className="text-muted-foreground">
              Transform your React code to pure Next.js Pages Router structure - Get only the essential converted files with no extra static content
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {debugInfo && (
            <Alert className="mb-4">
              <AlertTitle>Conversion Info</AlertTitle>
              <AlertDescription>{debugInfo}</AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="code" className="mb-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="code">Code Converter</TabsTrigger>
              <TabsTrigger value="project">Project Converter</TabsTrigger>
            </TabsList>
            
            <TabsContent value="code">
              <CodeEditor
                inputCode={inputCode}
                outputCode={outputCode}
                isLoading={isLoading}
                convertedFiles={convertedFiles}
                onInputChange={setInputCode}
                onConvertClick={handleConvertCode}
              />
            </TabsContent>
            
            <TabsContent value="project">
              <FileUploader onProjectConvert={handleProjectConversion} isLoading={isLoading} convertedFiles={convertedFiles} />
            </TabsContent>
          </Tabs>
          
          <ConversionTips />
        </div>
      </main>
      
      <footer className="border-t border-border py-4 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>© {new Date().getFullYear()} React to Next.js Converter - Pure conversion with essential files only</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
