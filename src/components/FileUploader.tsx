
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, FileCheck, Folder } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { NextJsFile } from '@/lib/gemini-api';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface FileUploaderProps {
  onProjectConvert: (projectStructure: string) => void;
  isLoading: boolean;
  convertedFiles?: NextJsFile[];
}

const FileUploader: React.FC<FileUploaderProps> = ({ onProjectConvert, isLoading, convertedFiles }) => {
  const { toast } = useToast();
  const [fileList, setFileList] = useState<{ name: string, content: string }[]>([]);
  const [projectStructure, setProjectStructure] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedFileContent, setSelectedFileContent] = useState<string>('');
  
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.type === 'text/javascript' || 
      file.type === 'application/javascript' ||
      file.type === 'text/jsx' ||
      file.type === 'text/tsx' ||
      file.type === 'application/json' ||
      file.type === 'text/html' ||
      file.type === 'text/css' ||
      file.type === 'text/plain' ||
      file.name.endsWith('.js') ||
      file.name.endsWith('.jsx') ||
      file.name.endsWith('.ts') ||
      file.name.endsWith('.tsx') ||
      file.name.endsWith('.json') ||
      file.name.endsWith('.html') ||
      file.name.endsWith('.css')
    );
    
    if (validFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Invalid files",
        description: "Please upload JavaScript, TypeScript, HTML, CSS, or JSON files.",
        duration: 3000,
      });
      return;
    }
    
    // Reset file list and prepare to read new files
    setFileList([]);
    setProjectStructure('');
    setUploadProgress(0);
    
    let filesRead = 0;
    let projectStructureText = '';
    const newFileList: { name: string, content: string }[] = [];
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        filesRead++;
        setUploadProgress(Math.round((filesRead / validFiles.length) * 100));
        
        if (e.target?.result) {
          const content = e.target.result as string;
          newFileList.push({ name: file.name, content });
          projectStructureText += `File: ${file.name}\n\nContent:\n${content}\n\n`;
          
          if (filesRead === validFiles.length) {
            setFileList(newFileList);
            setProjectStructure(projectStructureText);
            toast({
              title: "Files uploaded",
              description: `${filesRead} files are ready for conversion.`,
              duration: 3000,
            });
          }
        }
      };
      
      reader.onerror = () => {
        filesRead++;
        setUploadProgress(Math.round((filesRead / validFiles.length) * 100));
        
        toast({
          variant: "destructive",
          title: "Error reading file",
          description: `Failed to read ${file.name}. Please try again.`,
          duration: 3000,
        });
        
        if (filesRead === validFiles.length) {
          setFileList(newFileList);
          setProjectStructure(projectStructureText);
        }
      };
      
      reader.readAsText(file);
    });
  };
  
  const handleConvertProject = () => {
    if (!projectStructure.trim()) {
      toast({
        variant: "destructive",
        title: "No files to convert",
        description: "Please upload some React files first.",
        duration: 3000,
      });
      return;
    }
    
    onProjectConvert(projectStructure);
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
    <Card className="p-5 w-full bg-card">
      {!convertedFiles ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload React Project Files</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  Drag and drop files here or click to browse
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept=".js,.jsx,.ts,.tsx,.json,.html,.css,.md"
                  className="hidden"
                  onChange={handleFilesChange}
                />
                <Button
                  variant="secondary"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select Files
                </Button>
              </div>
            </div>
          </div>
          
          {uploadProgress > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Upload progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
          
          {fileList.length > 0 && (
            <>
              <div className="space-y-1">
                <Label>Uploaded Files ({fileList.length})</Label>
                <ScrollArea className="h-[150px] border rounded-md p-2">
                  {fileList.map((file, index) => (
                    <div key={index} className="flex items-center text-sm p-1">
                      <FileCheck className="h-4 w-4 mr-2 text-green-500" />
                      <span className="flex-1 truncate">{file.name}</span>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleConvertProject} 
                  disabled={isLoading}
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
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-md">Converted Next.js Project</h3>
            <Button 
              variant="outline" 
              onClick={handleDownloadAllFiles}
              title="Download all files as zip"
            >
              Download Project
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-md p-3 md:col-span-1 h-[400px] overflow-y-auto">
              <div className="mb-2">
                <h4 className="font-medium text-sm">Project Files</h4>
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
            
            <div className="md:col-span-3">
              <Textarea
                value={selectedFile ? selectedFileContent : "Select a file to view its content"}
                readOnly
                className="h-[400px] custom-scrollbar font-mono text-sm p-4"
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FileUploader;
