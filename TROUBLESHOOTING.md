# Troubleshooting Guide

## Common Issues and Solutions

### 🔴 Installation Issues

#### Issue: `npm install` fails
**Symptoms**: Error during package installation

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Issue: Node version mismatch
**Symptoms**: "Unsupported engine" error

**Solution**:
```bash
# Check Node version (need 18+)
node --version

# Update Node.js if needed
# Download from nodejs.org
```

---

### 🔴 Development Server Issues

#### Issue: Server won't start
**Symptoms**: `npm run dev` fails

**Solutions**:
1. Check if port 3000 is already in use:
```bash
# Windows
netstat -ano | findstr :3000

# Mac/Linux
lsof -i :3000
```

2. Kill the process or use different port:
```bash
# Use different port
PORT=3001 npm run dev
```

#### Issue: "Module not found" errors
**Symptoms**: Import errors in console

**Solutions**:
```bash
# Reinstall dependencies
npm install

# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

---

### 🔴 Styling Issues

#### Issue: Tailwind styles not working
**Symptoms**: No styles applied, plain HTML

**Solutions**:
1. Check `postcss.config.js`:
```js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

2. Restart dev server:
```bash
npm run dev
```

#### Issue: Custom colors not showing
**Symptoms**: `bg-dark-950` not working

**Solution**: Check `app/globals.css` has CSS variables defined:
```css
@theme {
  --color-dark-950: #020617;
}
```

---

### 🔴 Scanner Issues

#### Issue: Camera not working
**Symptoms**: "Unable to access cameras" error

**Solutions**:
1. **Check browser permissions**:
   - Chrome: Settings → Privacy → Camera
   - Allow camera access for localhost

2. **Use HTTPS** (required for production):
   - Localhost works with HTTP
   - Production needs HTTPS

3. **Check if camera is in use**:
   - Close other apps using camera
   - Restart browser

4. **Try different browser**:
   - Chrome/Edge recommended
   - Safari may have restrictions

#### Issue: Scanner not detecting codes
**Symptoms**: Camera works but codes not scanning

**Solutions**:
1. Ensure good lighting
2. Hold code steady
3. Try different distance (15-30cm)
4. Check code quality (not blurry/damaged)
5. Try different code type (QR vs Barcode)

#### Issue: Multiple cameras, wrong one selected
**Solution**: Use camera dropdown in scanner to select correct camera

---

### 🔴 Build Issues

#### Issue: Build fails with TypeScript errors
**Symptoms**: `npm run build` shows type errors

**Solutions**:
```bash
# Check for type errors
npx tsc --noEmit

# Fix errors in reported files
# Common fixes:
# - Add missing types
# - Fix any types
# - Add proper imports
```

#### Issue: Build succeeds but app crashes
**Symptoms**: Production build crashes

**Solutions**:
1. Check environment variables
2. Test build locally:
```bash
npm run build
npm run start
```
3. Check browser console for errors

---

### 🔴 API Issues

#### Issue: API routes returning 404
**Symptoms**: `/api/seals` not found

**Solutions**:
1. Check file location: `app/api/seals/route.ts`
2. Ensure `route.ts` not `route.tsx`
3. Restart dev server
4. Check export: `export async function GET()`

#### Issue: API returns 500 error
**Symptoms**: Internal server error

**Solutions**:
1. Check server console for error details
2. Verify database connection (if using)
3. Check API route code for errors
4. Add try-catch blocks

---

### 🔴 Database Issues (After Backend Setup)

#### Issue: Prisma Client not found
**Symptoms**: "Cannot find module '@prisma/client'"

**Solution**:
```bash
npm install @prisma/client
npx prisma generate
```

#### Issue: Database connection failed
**Symptoms**: "Can't reach database server"

**Solutions**:
1. Check `.env.local` has correct DATABASE_URL
2. Verify database is running
3. Check network/firewall
4. Test connection string

#### Issue: Migration fails
**Symptoms**: `prisma migrate dev` errors

**Solutions**:
```bash
# Reset database (WARNING: deletes data)
npx prisma migrate reset

# Or fix migration manually
# Check prisma/migrations folder
```

---

### 🔴 Deployment Issues

#### Issue: Vercel deployment fails
**Symptoms**: Build fails on Vercel

**Solutions**:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies in package.json
3. Add environment variables in Vercel
4. Test build locally first:
```bash
npm run build
```

#### Issue: Environment variables not working
**Symptoms**: App works locally, fails in production

**Solutions**:
1. Add variables in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names (no typos)
4. Ensure NEXTAUTH_URL is production URL

---

### 🔴 Performance Issues

#### Issue: Slow page loads
**Symptoms**: Pages take long to load

**Solutions**:
1. Check network tab in browser DevTools
2. Optimize images
3. Check API response times
4. Enable caching
5. Use Vercel Analytics to identify bottlenecks

#### Issue: Scanner is laggy
**Symptoms**: Camera feed stutters

**Solutions**:
1. Reduce FPS in scanner config
2. Close other tabs/apps
3. Use better device/camera
4. Check CPU usage

---

### 🔴 Mobile Issues

#### Issue: Layout broken on mobile
**Symptoms**: UI doesn't fit screen

**Solutions**:
1. Check responsive classes in Tailwind
2. Test in browser DevTools mobile view
3. Add viewport meta tag (already in layout)
4. Check for fixed widths

#### Issue: Touch not working properly
**Symptoms**: Buttons hard to tap

**Solutions**:
1. Increase button size
2. Add more padding
3. Check z-index conflicts
4. Test on actual device

---

### 🔴 Browser-Specific Issues

#### Issue: Works in Chrome, not Safari
**Symptoms**: Features broken in Safari

**Solutions**:
1. Check Safari console for errors
2. Use polyfills if needed
3. Test camera API compatibility
4. Check CSS compatibility

#### Issue: Works locally, not in production
**Symptoms**: Production deployment has issues

**Solutions**:
1. Check production build locally
2. Verify environment variables
3. Check HTTPS requirements
4. Review Vercel logs

---

## 🔍 Debugging Tips

### Enable Verbose Logging
```bash
# Development
DEBUG=* npm run dev

# Check Next.js logs
```

### Browser DevTools
1. **Console**: Check for JavaScript errors
2. **Network**: Check API calls
3. **Application**: Check storage, cache
4. **Performance**: Check load times

### Check Logs
- **Development**: Terminal where `npm run dev` is running
- **Production**: Vercel dashboard → Logs

---

## 📞 Getting Help

If issue persists:

1. **Check Documentation**:
   - README.md
   - BACKEND_SETUP.md
   - FAQ.md

2. **Search Issues**:
   - GitHub issues
   - Stack Overflow
   - Next.js discussions

3. **Create Issue**:
   - Provide error message
   - Include steps to reproduce
   - Share relevant code
   - Mention environment (OS, Node version, browser)

---

## ✅ Prevention Tips

1. **Keep dependencies updated**:
```bash
npm update
```

2. **Use version control**:
```bash
git commit -m "Working state"
```

3. **Test before deploying**:
```bash
npm run build
npm run start
```

4. **Monitor production**:
   - Setup error tracking
   - Check Vercel Analytics
   - Review logs regularly

---

**Still stuck?** Mujhe batao, main help karunga!
