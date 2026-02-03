# Vercel Deployment Configuration for Codespace

## Environment Variables Required

Add these environment variables in your Vercel project settings:

### 1. GitHub OAuth (for Codespace Git Integration)
```
GITHUB_CLIENT_ID=Ov23liyzTLJXWIKN678T
GITHUB_CLIENT_SECRET=9e72ca39c362c188e42a12dab0945d500d7796f5
```

### 2. NextAuth Configuration
```
NEXTAUTH_URL=https://your-project.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
```

> **Generate NEXTAUTH_SECRET**: Run `openssl rand -base64 32` in your terminal

### 3. Existing Variables (Keep These)
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
```

---

## GitHub OAuth App Configuration

You need to update your GitHub OAuth app settings:

### Development Callback URL
```
http://localhost:3000/api/codespace/git/connect/callback
```

### Production Callback URL (Vercel)
```
https://your-project.vercel.app/api/codespace/git/connect/callback
```

### Steps to Update:
1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Click on your OAuth app
3. Update "Authorization callback URL" to **production** URL: `https://your-project.vercel.app/api/codespace/git/connect/callback`
4. Save changes

> **Note**: Replace `your-project.vercel.app` with your actual Vercel deployment URL

---

## Vercel Project Settings

### Build & Development Settings

**Framework Preset**: Next.js

**Build Command**: `npm run build` (default)

**Output Directory**: `.next` (default)

**Install Command**: `npm install` (default)

### Node.js Version
Ensure you're using Node.js 18.x or higher

---

## Deployment Checklist

- [ ] Add all environment variables in Vercel dashboard
- [ ] Update GitHub OAuth callback URL
- [ ] Re-deploy the project for changes to take effect
- [ ] Test GitHub connection in production
- [ ] Test repository browsing
- [ ] Test file upload functionality
- [ ] Test terminal commands (limited in serverless environment)

---

## Important Notes

### ⚠️ Terminal Limitations in Vercel
The terminal feature has limitations in serverless environments:
- Commands execute in isolated serverless functions
- No persistent state between commands
- 10-second execution timeout (Vercel limit)
- Limited to whitelisted commands for security

**Recommended Alternative**: For full terminal functionality, consider deploying to a container-based platform like Railway, Render, or a VPS.

### 🔒 Security Recommendations

1. **GitHub Token Storage**: Currently tokens are in memory. For production:
   - Store encrypted tokens in MongoDB
   - Add token refresh logic
   - Implement token expiration handling

2. **File Upload Security**:
   - Current limit: 10MB per file
   - Consider adding virus scanning for production
   - Implement rate limiting

3. **Terminal Security**:
   - Command whitelist is already implemented
   - Consider adding rate limiting
   - Monitor command execution logs

---

## Testing After Deployment

1. **Git Connection**:
   ```
   Navigate to Dashboard → Codespace → Git Panel
   Click "Connect GitHub Account"
   Complete OAuth flow
   ```

2. **Repository Browsing**:
   ```
   After connection, you should see your repositories
   Search and select a repository
   ```

3. **Commit Viewing**:
   ```
   After selecting a repo, switch to "History" tab
   Commits should load from GitHub API
   ```

4. **File Upload**:
   ```
   Go to File Explorer
   Click upload button or drag files
   Files should appear in tree
   ```

---

## Troubleshooting

### "OAuth callback URL mismatch"
- Ensure GitHub OAuth app has the correct production callback URL
- URL must match exactly (including https://)

### "GitHub connection failed"
- Check environment variables are set correctly
- Verify GitHub OAuth credentials
- Check browser console for errors

### "Terminal commands not working"
- Expected in serverless environment
- Commands have 10s timeout
- Check allowed commands whitelist

### "File upload failed"
- Check file size (max 10MB)
- Verify user is authenticated
- Check browser network tab for API errors

---

## Next Steps for Full Production Readiness

1. **Database Integration**:
   - Store GitHub tokens encrypted in MongoDB
   - Implement workspace persistence
   - Save file contents to database

2. **Real Git Operations**:
   - Implement actual repository cloning
   - Enable push/pull via GitHub API
   - Add conflict resolution

3. **Enhanced Security**:
   - Add rate limiting on all APIs
   - Implement file type validation
   - Add virus scanning for uploads

4. **Scalability**:
   - Implement file size quotas per user
   - Add workspace storage limits
   - Consider CDN for large files
