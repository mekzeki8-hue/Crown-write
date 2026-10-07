#!/bin/bash

# CrownWrite - Quick Deploy to Vercel Script
# Run this to deploy your latest changes

echo "🚀 CrownWrite Deployment Script"
echo "================================"
echo ""

# Check if git is clean
if [[ -n $(git status -s) ]]; then
    echo "❌ You have uncommitted changes. Please commit them first."
    git status -s
    exit 1
fi

echo "✅ Git is clean"
echo ""

# Show what will be deployed
echo "📦 Ready to deploy (16 commits):"
echo ""
git log --oneline -5
echo ""

# Check if GitHub remote exists
echo "🔍 Checking GitHub remote..."
if git ls-remote origin &>/dev/null; then
    echo "✅ GitHub remote found"
    echo ""
    
    # Push to GitHub
    echo "📤 Pushing to GitHub..."
    if git push origin main; then
        echo "✅ Successfully pushed to GitHub!"
        echo ""
        echo "🎉 Vercel will auto-deploy your changes!"
        echo ""
        echo "Monitor deployment:"
        echo "  https://vercel.com/dashboard"
        echo ""
        echo "Your site will be live at:"
        echo "  https://crownwrite.vercel.app"
        echo ""
    else
        echo "❌ Failed to push to GitHub"
        echo ""
        echo "Possible solutions:"
        echo "  1. Check your GitHub authentication"
        echo "  2. Run: git push origin main"
        echo "  3. Or follow manual steps below"
        exit 1
    fi
else
    echo "❌ GitHub remote not accessible"
    echo ""
    echo "📝 Manual Deployment Steps:"
    echo ""
    echo "1. Create GitHub repository:"
    echo "   → Go to: https://github.com/new"
    echo "   → Name: crownwrite"
    echo "   → Private repository (recommended)"
    echo ""
    echo "2. Update remote and push:"
    echo "   cd /Users/mac/Desktop/true/Crownwrite"
    echo "   git remote set-url origin https://github.com/YOUR-USERNAME/crownwrite.git"
    echo "   git push -u origin main"
    echo ""
    echo "3. Deploy on Vercel:"
    echo "   → Go to: https://vercel.com/new"
    echo "   → Import your GitHub repository"
    echo "   → Add environment variables (see DEPLOY_NOW.md)"
    echo "   → Click Deploy"
    echo ""
    echo "See DEPLOY_NOW.md for detailed instructions"
    exit 1
fi
