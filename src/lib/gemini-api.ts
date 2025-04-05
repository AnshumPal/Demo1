
const GEMINI_API_KEY = "AIzaSyCLbhJhz2hhZOIQc7u88HfNO7CRXN8Setk";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface ConversionResult {
  output: string;
  success: boolean;
  error?: string;
  files?: NextJsFile[];
}

export interface NextJsFile {
  path: string;
  content: string;
}

export async function convertCodeToNextJs(
  reactCode: string,
  contextInfo?: string
): Promise<ConversionResult> {
  try {
    const prompt = `
      As an expert in React and Next.js, convert the following React code to pure Next.js code (Pages Router). Create a comprehensive conversion with enhanced functionality.

      REACT CODE TO CONVERT:
      \`\`\`
      ${reactCode}
      \`\`\`
      
      ${contextInfo ? `ADDITIONAL CONTEXT: ${contextInfo}` : ''}

      STRICT CONVERSION REQUIREMENTS:
      1. Generate ONLY the core Next.js files that are absolutely necessary for the functionality in the React code
      2. Apply these advanced Next.js best practices:
         - Convert React Router to Next.js file-based routing
         - Replace useEffect data fetching with getServerSideProps/getStaticProps
         - Use Next/Image for image optimization
         - Implement Next.js Head component for metadata/SEO
         - Move API calls to Next.js API routes where appropriate
         - Implement proper state management with context or hooks
         - Use Next.js data fetching patterns instead of React patterns
         - Convert custom routing to Next.js dynamic routes
         - Transform event handling to Next.js compatible patterns
      3. CRITICAL - DO NOT include:
         - Any utility files that aren't directly referenced
         - Placeholder or example code
         - Boilerplate setup files (like next.config.js) unless absolutely necessary
         - Any static content, demo files, or README
         - Sample data or mock files
      4. The converted code must preserve ALL original functionality
      5. Include brief explanatory comments to explain key conversion decisions
      6. For complex UI components, preserve exact styling and behavior
      7. Optimize for Next.js performance best practices

      FORMAT YOUR RESPONSE AS A JSON ARRAY OF FILES, where each file has a 'path' and 'content' property, like:
      [
        {
          "path": "pages/index.js",
          "content": "// Complete code content here"
        },
        {
          "path": "components/Header.js", 
          "content": "// Complete code content here"
        }
      ]

      CRITICAL: OUTPUT ONLY THE JSON ARRAY OF FILES, WITH NO ADDITIONAL TEXT, EXPLANATIONS, OR MARKDOWN. THE OUTPUT MUST BE VALID JSON.
    `;

    console.log("Sending request to Gemini API with prompt length:", prompt.length);

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Gemini API error:", data);
      return {
        output: "",
        success: false,
        error: `API Error: ${data.error?.message || "Unknown error occurred"}`,
      };
    }

    const data = await response.json();
    console.log("Gemini API response:", JSON.stringify(data).substring(0, 500) + "...");

    if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
      const output = data.candidates[0].content.parts[0].text;
      console.log("Raw output from Gemini:", output.substring(0, 500) + "...");
      
      try {
        // Clean up the output - remove markdown code blocks and other non-JSON content
        let cleanedOutput = output;
        
        // Remove markdown triple backticks and json tag if present
        cleanedOutput = cleanedOutput.replace(/```json/g, '').replace(/```/g, '');
        
        // Trim whitespace to get clean JSON
        cleanedOutput = cleanedOutput.trim();
        
        // If there's still no valid JSON, try to find an array pattern
        if (!cleanedOutput.startsWith('[')) {
          const jsonRegex = /\[\s*\{\s*"path"\s*:.+\}\s*\]/s;
          const jsonMatch = output.match(jsonRegex);
          
          if (jsonMatch) {
            cleanedOutput = jsonMatch[0];
          } else {
            throw new Error("No valid JSON array found in the response");
          }
        }
        
        console.log("Cleaned output before parsing:", cleanedOutput.substring(0, 200) + "...");
        
        try {
          const files = JSON.parse(cleanedOutput) as NextJsFile[];
          
          // Validate the files array to ensure it's properly structured
          if (Array.isArray(files) && files.length > 0 && files.every(file => 
              typeof file === 'object' && 
              typeof file.path === 'string' && 
              typeof file.content === 'string')) {
            
            // Ensure files have correct Next.js structure
            const hasValidStructure = files.some(file => 
              file.path.startsWith('pages/') || 
              file.path.startsWith('components/') || 
              file.path.startsWith('lib/') || 
              file.path.startsWith('hooks/')
            );
            
            if (!hasValidStructure) {
              console.warn("Generated files don't follow Next.js structure", files);
              throw new Error("Generated files don't follow Next.js structure");
            }
            
            return {
              output: "Conversion successful! Your pure Next.js code is ready.",
              success: true,
              files
            };
          } else {
            console.error("Invalid file structure in response:", files);
            throw new Error("Invalid file structure in API response");
          }
        } catch (parseError) {
          console.error("Error parsing JSON from API response:", parseError, cleanedOutput.substring(0, 200) + "...");
          throw new Error("Failed to parse JSON response");
        }
      } catch (error) {
        console.error("Error processing API response:", error);
        
        // Return a more helpful error message
        return {
          output: "",
          success: false,
          error: `Failed to generate Next.js files: ${error instanceof Error ? error.message : "Unknown error"}. Please try again with a different code sample.`,
        };
      }
    } else {
      return {
        output: "",
        success: false,
        error: "No output was generated. Please try again with different code.",
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      output: "",
      success: false,
      error: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
    };
  }
}

export async function convertProjectStructure(
  projectStructure: string
): Promise<ConversionResult> {
  try {
    const prompt = `
      As an expert in React and Next.js migration, convert the provided React project structure to pure Next.js (Pages Router) code with no unnecessary files.

      CURRENT REACT PROJECT STRUCTURE:
      \`\`\`
      ${projectStructure}
      \`\`\`

      STRICT REQUIREMENTS:
      1. Generate ONLY the essential Next.js files that directly implement the functionality from the React project
      2. Convert ALL existing components and features precisely - nothing should be lost
      3. Apply these advanced Next.js best practices:
         - Replace React Router with Next.js file-based routing including dynamic routes
         - Convert data fetching to getServerSideProps/getStaticProps
         - Implement Next/Image for image optimization
         - Include proper SEO with Head component
         - Move API calls to Next.js API routes
         - Convert Redux/Context to Next.js compatible state management
         - Transform React-specific patterns to Next.js patterns
         - Implement proper error boundaries and loading states
         - Create _app.js and _document.js files if needed for global state/styles
      4. Include only necessary package.json dependencies
      5. CRITICAL - DO NOT include:
         - Any utility files that aren't referenced
         - Placeholder or example code
         - Boilerplate files not directly needed
         - Sample data or mock files
         - README.md or other documentation
         - Any static content or assets
      6. The converted project MUST maintain ALL original functionality and behavior
      7. Include brief explanatory comments only where necessary for complex conversions
      8. If the React project uses a specific state management library (Redux, MobX, etc.), 
         adapt it properly for Next.js

      FORMAT YOUR RESPONSE AS A JSON ARRAY OF FILES, where each file has a 'path' and 'content' property, like:
      [
        {
          "path": "pages/index.js",
          "content": "// Complete code content here"
        },
        {
          "path": "components/Header.js", 
          "content": "// Complete code content here"
        },
        {
          "path": "pages/api/data.js",
          "content": "// Complete code content here" 
        }
      ]

      CRITICAL: OUTPUT ONLY THE JSON ARRAY OF FILES, WITH NO ADDITIONAL TEXT, EXPLANATIONS, OR MARKDOWN. THE OUTPUT MUST BE VALID JSON.
    `;

    console.log("Sending project conversion request to Gemini API");

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.error("Gemini API error:", data);
      return {
        output: "",
        success: false,
        error: `API Error: ${data.error?.message || "Unknown error occurred"}`,
      };
    }

    const data = await response.json();
    console.log("Gemini project conversion response:", JSON.stringify(data).substring(0, 500) + "...");

    if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
      const output = data.candidates[0].content.parts[0].text;
      console.log("Raw project conversion output:", output.substring(0, 500) + "...");
      
      try {
        // Clean up the output - remove markdown code blocks and other non-JSON content
        let cleanedOutput = output;
        
        // Remove markdown triple backticks and json tag if present
        cleanedOutput = cleanedOutput.replace(/```json/g, '').replace(/```/g, '');
        
        // Trim whitespace to get clean JSON
        cleanedOutput = cleanedOutput.trim();
        
        // If there's still no valid JSON, try to find an array pattern
        if (!cleanedOutput.startsWith('[')) {
          const jsonRegex = /\[\s*\{\s*"path"\s*:.+\}\s*\]/s;
          const jsonMatch = output.match(jsonRegex);
          
          if (jsonMatch) {
            cleanedOutput = jsonMatch[0];
          } else {
            throw new Error("No valid JSON array found in the response");
          }
        }
        
        console.log("Cleaned project output before parsing:", cleanedOutput.substring(0, 200) + "...");
        
        try {
          const files = JSON.parse(cleanedOutput) as NextJsFile[];
          
          // Validate the files array to ensure it's properly structured
          if (Array.isArray(files) && files.length > 0 && files.every(file => 
              typeof file === 'object' && 
              typeof file.path === 'string' && 
              typeof file.content === 'string')) {
            
            // Ensure files have correct Next.js structure
            const hasValidStructure = files.some(file => 
              file.path.startsWith('pages/') || 
              file.path.includes('_app.js') || 
              file.path.includes('_document.js')
            );
            
            if (!hasValidStructure) {
              console.warn("Generated project files don't follow Next.js structure", files);
              throw new Error("Generated project files don't follow Next.js structure");
            }
            
            return {
              output: "Project conversion successful! Your pure Next.js project files are ready.",
              success: true,
              files
            };
          } else {
            console.error("Invalid file structure in response:", files);
            throw new Error("Invalid file structure in API response");
          }
        } catch (parseError) {
          console.error("Error parsing JSON from API response:", parseError, cleanedOutput.substring(0, 200) + "...");
          throw new Error("Failed to parse JSON response");
        }
      } catch (error) {
        console.error("Error processing API response:", error);
        
        return {
          output: "",
          success: false,
          error: `Failed to generate Next.js project: ${error instanceof Error ? error.message : "Unknown error"}. Please try again with a different project structure.`,
        };
      }
    } else {
      return {
        output: "",
        success: false,
        error: "No output was generated. Please try again with different project structure.",
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      output: "",
      success: false,
      error: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
    };
  }
}
