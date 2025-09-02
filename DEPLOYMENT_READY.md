# 🚀 GoalMine.ai - Deployment Guide & Development Workflow

## 📋 Environment Setup & Architecture

### Project Structure
- **Original Development**: Created in Lovable.dev as "steady-aim-coach"
- **Current Development**: Cursor (Claude Code) with local development
- **Repository**: GitHub - `relevantnoise/goalmine`
- **Live Domain**: goalmine.ai (via GoDaddy DNS → Vercel)

### Vercel Projects
1. **steady-aim-coach** (Development/Staging)
   - Auto-deploys from GitHub pushes
   - Used for preview deployments
   - URL: steady-aim-coach-main-*.vercel.app

2. **GoalMine** (Production)
   - Connected to same GitHub repository
   - Auto-deploys from main branch
   - Domain: goalmine.ai
   - Has production environment variables configured

### Tech Stack
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Authentication**: Firebase (via CDN)
- **Backend**: Supabase (Database + Edge Functions)
- **Hosting**: Vercel
- **Payments**: Stripe
- **Email**: Resend for all non-auth emails (Firebase handles auth emails)

---

## 🔄 Development Workflow & Best Practices

### 1. Development Process
```
Local Development (localhost:5173)
    ↓
Testing in Dev Environment
    ↓
Commit to Git
    ↓
Push to GitHub
    ↓
Auto-Deploy to Vercel (both projects)
    ↓
Production Testing on goalmine.ai
```

### 2. Development Best Practices

#### Always Work in Dev First
- Make ALL changes in local development environment
- Test thoroughly at localhost:5173
- Never edit production directly

#### Testing Protocol
1. **Before Committing**: Run full test suite locally
2. **Build Test**: `npm run build` must succeed without errors
3. **Manual Testing**: Complete the testing checklist below
4. **Commit with Clear Messages**: Describe what was fixed/added

#### Git Workflow
```bash
# 1. Check status
git status

# 2. Add all changes
git add -A

# 3. Commit with descriptive message
git commit -m "Fix: [specific issue] - [what was done]"

# 4. Push to GitHub (triggers auto-deploy)
git push origin main
```

---

## 🚢 Deployment Process (Dev → Production)

### Step-by-Step Deployment

#### 1. Pre-Deployment Checklist
- [ ] All features tested locally
- [ ] No console errors in browser
- [ ] Build completes successfully (`npm run build`)
- [ ] All edge functions deployed to Supabase
- [ ] Environment variables verified in Vercel

#### 2. Deploy to Production
```bash
# 1. Ensure all changes are committed
git status

# 2. Stage all changes
git add -A

# 3. Commit with version note
git commit -m "Production release: [version] - [summary of changes]"

# 4. Push to GitHub (auto-deploys to both Vercel projects)
git push origin main

# 5. Monitor deployment (2-3 minutes)
# Check: https://vercel.com/dashboard
```

#### 3. Verify Deployment
- Visit https://goalmine.ai
- Check Vercel dashboard for successful deployment
- Run production testing checklist

---

## ✅ Testing Checklists

### Local Development Testing (Before Pushing)

#### Core Features
- [ ] User can sign up with email/Google
- [ ] Email verification works
- [ ] Goal creation flow completes
- [ ] Dashboard loads without "No Active Goals" flash
- [ ] Check-ins work (once per day)
- [ ] Streaks calculate correctly
- [ ] Nudges generate properly

#### Subscription Limits
- [ ] Free users: 1 goal maximum
- [ ] Free users: 1 nudge per day
- [ ] Premium users: 3 goals maximum
- [ ] Premium users: 3 nudges per day
- [ ] Upgrade prompts appear correctly

#### UI/UX
- [ ] All buttons work
- [ ] Toast notifications appear
- [ ] Loading states display properly
- [ ] Mobile responsive design works
- [ ] No console errors

### Production Testing (After Deployment)

#### Critical Path Testing
1. **New User Flow**
   - [ ] Sign up with fresh email
   - [ ] Receive verification email
   - [ ] Complete goal creation
   - [ ] Receive first motivational email
   - [ ] Land on dashboard with goal visible

2. **Returning User Flow**
   - [ ] Log in successfully
   - [ ] Dashboard loads with existing goals
   - [ ] Can check in once per day
   - [ ] Can get nudges (respecting limits)
   - [ ] Can edit/delete goals

3. **Subscription Flow**
   - [ ] Free user sees upgrade prompts
   - [ ] Stripe checkout loads
   - [ ] Subscription limits enforced

4. **Email System**
   - [ ] Daily motivation emails sending (via Resend)
   - [ ] Nudge emails arrive (via Resend)
   - [ ] Email verification works (via Firebase)
   - [ ] Email templates render correctly

---

## 🔧 Environment Variables

### Required in Vercel (Production)
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

### Required in Supabase Edge Functions
```
OPENAI_API_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
```

---

## 🚨 Troubleshooting Common Issues

### Issue: Changes not appearing on goalmine.ai
**Solution**: 
1. Check Vercel dashboard for deployment status
2. Clear browser cache
3. Verify GitHub push was successful

### Issue: "No Active Goals" flash on dashboard
**Solution**: 
- Ensure `authLoading` and `goalsLoading` are coordinated
- Check Dashboard.tsx loading logic

### Issue: Firebase authentication errors
**Solution**:
- Verify Firebase project settings
- Check authorized domains include goalmine.ai
- Ensure environment variables are set

### Issue: Subscription limits not working
**Solution**:
- Check Supabase `check-subscription` edge function
- Verify Stripe webhook is configured
- Test with real Stripe test keys

---

## 📊 Monitoring & Maintenance

### Daily Checks
- Verify daily email cron job ran (7 AM EST)
- Check error logs in Vercel dashboard
- Monitor Supabase edge function logs

### Weekly Maintenance
- Review user feedback
- Check Stripe for failed payments
- Audit database for orphaned records
- Review email delivery rates

---

## 🔐 Security Notes

### Never Commit
- API keys or secrets
- .env files
- User data or passwords
- Debug/test user credentials

### Always Use
- Environment variables for sensitive data
- HTTPS for all communications
- Proper authentication checks
- Supabase RLS policies

---

## 📞 Quick Reference

### Key Commands
```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to production
git add -A && git commit -m "message" && git push origin main

# Check deployment status
# Visit: https://vercel.com/dashboard
```

### Important URLs
- **Production**: https://goalmine.ai
- **GitHub**: https://github.com/relevantnoise/goalmine
- **Vercel Dashboard**: https://vercel.com
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Stripe Dashboard**: https://dashboard.stripe.com

---

## 📝 Version History

### Latest Release (December 2024)
- Fixed Firebase authentication flow
- Corrected subscription limits
- Resolved loading state issues
- Fixed email delivery system
- Enhanced UI consistency

### Previous Issues Resolved
- Email verification redirect issue
- "No Active Goals" flash on dashboard
- Subscription limit enforcement
- Daily check-in timezone calculations
- Motivation content generation

---

## ✨ Ready for Production!

This guide ensures smooth development and deployment workflows. Always follow the testing checklists and deployment process to maintain a stable production environment at goalmine.ai.