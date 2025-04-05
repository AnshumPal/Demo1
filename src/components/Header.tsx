
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b border-border py-3">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-lg font-medium">
          NextForge
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link to="/guide">
            <Button variant="ghost" size="sm">Guide</Button>
          </Link>
          <a
            href="https://github.com/nextjs/next.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
