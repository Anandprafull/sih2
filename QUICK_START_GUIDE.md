# 🚀 DPR Analyzer - Quick Start Guide

## Welcome to DPR Analyzer!

AI-powered Detailed Project Report analysis platform with multilingual support.

---

## 📋 Table of Contents

1. [Installation](#installation)
2. [First Run](#first-run)
3. [Core Features](#core-features)
4. [PWA Installation](#pwa-installation)
5. [Troubleshooting](#troubleshooting)

---

## 💻 Installation

### Prerequisites
- Node.js 18+ installed
- npm or bun package manager

### Setup Steps

```bash
# 1. Navigate to project directory
cd d:\ssiihh\sih2\sih2

# 2. Install dependencies
npm install

# 3. Create environment file
# Create .env file in root directory with:
VITE_SARVAM_API_KEY=your_api_key_here

# 4. Start development server
npm run dev

# 5. Open browser
# Visit: http://localhost:5173
```

---

## 🎯 First Run

### 1. Upload Your First DPR

- Click **"Upload Document"** on homepage
- Drag & drop PDF file (or click to browse)
- Wait 3-5 seconds for AI analysis
- 🎉 Confetti celebration on success!

### 2. Explore Analysis Tabs

**Overview Tab:**
- Project summary
- Key metrics (Budget, Duration, Location)
- Status indicator
- Animated counters

**Budget Tab:**
- Interactive pie chart
- Click segments for details
- Budget breakdown by category
- Export to Excel

**Timeline Tab:**
- Gantt chart (5 phases)
- Phase activities
- Duration tracking
- Progress visualization

**Risk Analysis Tab:**
- Risk matrix heatmap (3×3 grid)
- Search & filter risks
- Severity indicators
- Mitigation strategies

**Q&A Tab:**
- Ask AI Assistant questions
- 6 suggested questions
- Typing indicator animation
- Follow-up suggestions

### 3. Save Your Analysis

- Click **"Save Analysis"** button (top-right)
- Saved to localStorage (max 10)
- View saved analyses from dropdown
- Delete old analyses anytime

---

## ✨ Core Features

### 🌓 Dark Mode
- Click sun/moon icon in navbar
- Auto-persists to localStorage
- System preference detection

### 🌐 Multilingual Support
- Click language dropdown in navbar
- Choose from 10 Indian languages
- Real-time translation via Sarvam AI
- Cached for faster loading

### 📊 Interactive Charts
- Hover to highlight segments
- Click for detailed breakdown
- Animated transitions
- Responsive design

### 💾 Export Data
- **Excel:** 5 sheets (Overview, Budget, Timeline, Risks, Recommendations)
- **JSON:** Formatted output with all data
- Select format from dropdown
- Instant download

### 🔍 Search & Filter
- Search risks by keyword
- Filter by severity (All/High/Medium/Low)
- Clear button to reset
- Results count display

### 📁 Projects Gallery
- View all saved projects
- Filter by status/budget/region
- Grid layout (responsive)
- Quick access to analysis

### 🔄 DPR Comparison
- Compare 2 DPRs side-by-side
- Percentage differences
- Trend indicators
- Key insights highlights

---

## 📱 PWA Installation

### Desktop (Chrome/Edge)

1. Visit the app in browser
2. Wait 3 seconds for install prompt
3. Click **"Install App"**
4. App opens in standalone window
5. Access from Start Menu/Desktop

**Manual Install:**
- Click ⋮ (menu) → Install DPR Analyzer
- Or URL bar icon (💻 Install)

### iOS (Safari)

1. Open app in Safari
2. Tap **Share** button (🔼)
3. Scroll down → **"Add to Home Screen"**
4. Tap **"Add"** (top-right)
5. App appears on Home Screen

### Android (Chrome)

1. Visit app in Chrome
2. Tap install banner (bottom)
3. Or menu → **"Install app"**
4. Confirm installation
5. Access from app drawer

### Offline Support

✅ Works offline after first visit  
✅ Cached static assets  
✅ Saved analyses available  
✅ Auto-sync when back online

---

## 🎨 Tips & Tricks

### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Focus search
- `Esc` - Close modals
- `Tab` - Navigate interactive elements

### Performance
- First load caches all assets
- Subsequent loads instant
- Translation cache reduces API calls
- Service worker handles offline mode

### Best Practices
- Save important analyses immediately
- Export data before clearing browser cache
- Update language preference once
- Install as PWA for best experience

### Data Limits
- **Max Saved Analyses:** 10 (auto-removes oldest)
- **File Upload Size:** 50MB recommended
- **Supported Formats:** PDF, DOCX (simulated)
- **Translation Cache:** Unlimited (browser storage)

---

## 🐛 Troubleshooting

### Common Issues

**Q: Install prompt not appearing?**
- A: Wait 3 seconds after page load
- A: Check if already installed (standalone mode)
- A: Try manual install (browser menu)

**Q: Translation not working?**
- A: Verify `.env` has `VITE_SARVAM_API_KEY`
- A: Check API key is valid
- A: Check network connection
- A: Common labels work offline (cached)

**Q: Upload failing?**
- A: Check file size (<50MB recommended)
- A: Verify PDF format
- A: Try different file
- A: Clear browser cache

**Q: Dark mode not saving?**
- A: Check localStorage enabled in browser
- A: Disable private/incognito mode
- A: Clear site data and retry

**Q: Service worker not registering?**
- A: Requires HTTPS in production
- A: Check DevTools → Application → Service Workers
- A: Unregister old workers
- A: Hard refresh (Ctrl+Shift+R)

### Error Messages

**"Failed to load analysis"**
- Document processing error
- Try re-uploading file
- Check file integrity

**"Translation unavailable"**
- API key missing/invalid
- Network connection issue
- Fallback to cached translations

**"Cannot save analysis"**
- localStorage full (max 10 items)
- Delete old analyses
- Check browser storage quota

### Browser Compatibility

✅ **Recommended:**
- Chrome 90+
- Edge 90+
- Safari 14+
- Firefox 88+

⚠️ **Limited Support:**
- IE 11 (not supported)
- Old mobile browsers

---

## 📞 Support

**For Issues:**
- Check console (F12) for errors
- Review this guide
- Clear cache and retry
- Contact development team

**For Features:**
- Submit feature requests
- Report bugs on GitHub
- Share feedback

---

## 🔒 Privacy & Security

✅ **Data Storage:**
- All data stored locally (localStorage)
- No server-side storage
- No data collection
- User controls all data

✅ **API Usage:**
- Sarvam AI for translation only
- API key required (user-provided)
- No tracking or analytics

✅ **Offline Mode:**
- Works without internet
- No data sent offline
- Auto-sync when online

---

## 🎓 Learning Resources

### Video Tutorials
- [ ] Upload & Analysis Walkthrough
- [ ] PWA Installation Guide
- [ ] Advanced Features Tutorial

### Documentation
- [Full Implementation Summary](./IMPLEMENTATION_SUMMARY.md)
- [API Documentation](./API_DOCS.md)
- [Architecture Overview](./ARCHITECTURE.md)

---

## 🎉 Success Stories

### Use Cases
✅ Government project evaluation  
✅ Budget planning & optimization  
✅ Risk assessment & mitigation  
✅ Multi-language collaboration  
✅ Offline field work

---

## 📈 Next Steps

1. **Explore all tabs** in analysis view
2. **Try different languages** for multilingual testing
3. **Install as PWA** for native app experience
4. **Compare multiple DPRs** for insights
5. **Export data** for reporting

---

## 🌟 Pro Tips

💡 **Save frequently used analyses** for quick access  
💡 **Use search** to find specific risks  
💡 **Export to Excel** for detailed reporting  
💡 **Compare DPRs** to identify best practices  
💡 **Install as app** for productivity boost

---

**Need Help?** Check troubleshooting section or contact support.

**Ready to analyze?** Start uploading your first DPR! 🚀

---

**Built with ❤️ for Smart India Hackathon 2024**  
**Ministry of Development of North Eastern Region (MDoNER)**
