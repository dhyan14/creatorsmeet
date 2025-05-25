# Get the current date and time for the commit message
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Update deployment - $timestamp"

# Add all changes to git
git add .

# Commit changes with timestamp
git commit -m $commitMessage

# Push to GitHub
git push

# Deploy to Vercel
npx vercel deploy --prod

Write-Host "Deployment complete! Check the Vercel URL above."
Write-Host "Committed with message: $commitMessage" 