
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Copy, CheckCircle2, RefreshCw, FileDown, Folder } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { NextJsFile } from '@/lib/gemini-api';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface CodeEditorProps {
  inputCode: string;
  outputCode: string;
  isLoading: boolean;
  convertedFiles?: NextJsFile[];
  onInputChange: (value: string) => void;
  onConvertClick: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  inputCode,
  outputCode,
  isLoading,
  convertedFiles,
  onInputChange,
  onConvertClick,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewLines, setPreviewLines] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileContent, setSelectedFileContent] = useState<string>('');

  // Simulate typing effect for conversion preview
  useEffect(() => {
    if (isLoading) {
      setShowPreview(true);
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 5;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 200);

      // Generate some preview lines to simulate thinking
      const previewTextLines = [
        "Analyzing React components...",
        "Converting routing system...",
        "Adapting to Next.js file structure...",
        "Transforming data fetching methods...",
        "Adjusting import statements...",
        "Creating pages directory structure...",
        "Converting client-side navigation...",
        "Finalizing Next.js conversion..."
      ];
      
      let lineIndex = 0;
      const textInterval = setInterval(() => {
        if (lineIndex < previewTextLines.length) {
          setPreviewLines(prev => [...prev, previewTextLines[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(textInterval);
        }
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(textInterval);
      };
    } else {
      setProgress(0);
      setPreviewLines([]);
      setShowPreview(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (convertedFiles && convertedFiles.length > 0 && !selectedFile) {
      setSelectedFile(convertedFiles[0].path);
      setSelectedFileContent(convertedFiles[0].content);
    }
  }, [convertedFiles, selectedFile]);

  const handleCopyToClipboard = async () => {
    if (!outputCode && !selectedFileContent) return;
    
    try {
      await navigator.clipboard.writeText(selectedFileContent || outputCode);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The Next.js code has been copied to your clipboard.",
        duration: 3000,
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelection = (filePath: string) => {
    if (!convertedFiles) return;
    
    const selectedFile = convertedFiles.find(file => file.path === filePath);
    if (selectedFile) {
      setSelectedFile(filePath);
      setSelectedFileContent(selectedFile.content);
    }
  };

  const handleDownloadAllFiles = async () => {
    if (!convertedFiles || convertedFiles.length === 0) return;

    const zip = new JSZip();
    
    // Add all files to the zip
    convertedFiles.forEach(file => {
      // Split the path to create proper folder structure
      const parts = file.path.split('/');
      let currentFolder = zip;
      
      // Create folders if needed (for nested paths)
      if (parts.length > 1) {
        for (let i = 0; i < parts.length - 1; i++) {
          if (parts[i]) {
            currentFolder = currentFolder.folder(parts[i]) || currentFolder;
          }
        }
      }
      
      // Add the file to the appropriate folder
      const fileName = parts[parts.length - 1];
      currentFolder.file(fileName, file.content);
    });
    
    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });
    
    // Save the zip file
    saveAs(content, "nextjs-project.zip");
    
    toast({
      title: "Download started",
      description: "Your Next.js project has been packaged as a zip file.",
      duration: 3000,
    });
  };

  return (
    <Card className="p-5 w-full bg-card shadow-lg">
      <Tabs defaultValue="input" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="input">React Code</TabsTrigger>
          {convertedFiles && convertedFiles.length > 0 ? (
            <TabsTrigger value="files">Next.js Files</TabsTrigger>
          ) : (
            <TabsTrigger value="output">Next.js Code</TabsTrigger>
          )}
          {showPreview && <TabsTrigger value="preview">Live Preview</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="input" className="space-y-4">
          <Textarea
            value={inputCode}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Paste your React code here..."
            className="min-h-[400px] custom-scrollbar font-mono text-sm p-4"
          />
          <div className="flex justify-end">
            <Button 
              onClick={onConvertClick}
              disabled={isLoading || !inputCode.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to Next.js"
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="output" className="space-y-4">
          <div className="relative">
            <Textarea
              value={outputCode}
              readOnly
              placeholder="Next.js code will appear here..."
              className="min-h-[400px] custom-scrollbar font-mono text-sm p-4"
            />
            {outputCode && (
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCopyToClipboard}
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="files" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-md p-3 md:col-span-1 h-[400px] overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">Project Files</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDownloadAllFiles}
                  title="Download all files as zip"
                >
                  <FileDown className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              <div className="space-y-1">
                {convertedFiles?.map((file, index) => (
                  <div 
                    key={index}
                    className={`text-xs p-2 rounded cursor-pointer flex items-center ${selectedFile === file.path ? 'bg-muted font-medium' : 'hover:bg-muted/50'}`}
                    onClick={() => handleFileSelection(file.path)}
                  >
                    <Folder className="h-3 w-3 mr-1 opacity-70" />
                    <span className="truncate">{file.path}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative md:col-span-3 h-[400px]">
              <Textarea
                value={selectedFileContent}
                readOnly
                className="h-full custom-scrollbar font-mono text-sm p-4"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCopyToClipboard}
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm min-h-[400px]">
            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <div className="text-xs mt-1 text-right">
                {Math.round(progress)}% complete
              </div>
            </div>
            
            <div className="space-y-2">
              {previewLines.map((line, index) => (
                <div key={index} className="flex">
                  <span className="mr-2 opacity-60">&gt;</span>
                  <span>{line}</span>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  <span className="animate-pulse">Converting...</span>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CodeEditor;
