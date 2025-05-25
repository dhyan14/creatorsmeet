# Add all changes to git
git add .

# Prompt for commit message
$commitMessage = Read-Host -Prompt 'Enter commit message'

# Commit changes
git commit -m "$commitMessage"

# Push to GitHub
git push

# Deploy to Vercel
npx vercel deploy --prod

Write-Host "Deployment complete! Check the Vercel URL above." 