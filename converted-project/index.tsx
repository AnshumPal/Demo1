powershell -command "Get-Clipboard" > converted-project/index.tsx

git add converted-project/index.tsx

git commit -m "? Auto: Converted React to Next.js and saved to index.tsx"

git push origin master

