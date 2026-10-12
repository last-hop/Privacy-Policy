# Multi-Application Privacy Policy & Terms Portal
### Ready for GitHub Pages, Google Play Console, and Apple App Store

A modern, responsive, legally compliant Privacy Policy and Terms of Service hub designed for indie developers, software studios, and mobile app publishers. Supports a **single universal policy** or **app-specific configurations** via query parameters (e.g. `?app=taskflow-pro`).

---

## 🌟 Key Features

- **Multi-App Ready**: Manage privacy policies for 1, 10, or 100 apps from a single clean configuration file (`apps-config.js`).
- **Store-Compliant URL Deep-Linking**:
  - Universal Policy: `https://<username>.github.io/<repo>/`
  - Specific App: `https://<username>.github.io/<repo>/?app=taskflow-pro`
- **Google Play & Apple App Store Aligned**:
  - Dedicated **User Data Deletion Request** procedure box (Google Play mandatory requirement).
  - Explicit disclosures for device permissions (Camera, Location, Notifications, Alarms, etc.).
  - Third-party SDK integration disclosures with outbound privacy links (AdMob, Firebase, Unity Ads, Sentry, RevenueCat, etc.).
  - Children’s Privacy disclosures (COPPA & GDPR-K).
  - GDPR & CCPA/CPRA individual data rights.
- **Modern Clean UI**:
  - Dark & Light mode toggle with persistent state.
  - Sticky sidebar with active Table of Contents (scrollspy).
  - App Switcher dropdown.
  - One-click **"Copy Link"** button to easily grab the exact URL for store listings.
  - One-click **"PDF / Print"** with clean print stylesheet (removes headers/nav for clean PDF export).
  - Matching **Terms of Service** (`terms.html`).
- **Zero Build Step**: Pure HTML5, CSS3, and Vanilla JavaScript. Works automatically on GitHub Pages.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

### Step 1: Customize Your Information
Open [`apps-config.js`](file:///apps-config.js):
1. **Update Developer Profile**: Set your studio name, contact email, website, and address.
2. **Add / Edit Your Apps**: Customize the `apps` array with your app's ID (slug), name, permissions, data collected, and third-party SDKs.

### Step 2: Push to GitHub

Open PowerShell or terminal in this folder (`e:\policy`) and run:

```powershell
# 1. Initialize git
git init -b main

# 2. Add files and commit
git add .
git commit -m "Initial commit: Multi-app Privacy Policy portal"

# 3. Create a new repository on GitHub (e.g., named 'privacy-policy' or 'policy')
# 4. Link your local repo to GitHub (replace with your repo URL):
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# 5. Push to GitHub
git push -u origin main
```

### Step 3: Turn on GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top).
3. On the left sidebar, click **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/(root)`.
5. Click **Save**.
6. Wait 1–2 minutes. GitHub will display:
   > *Your site is live at `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`*

---

## 📱 Submitting to App Stores

### Google Play Console
1. In Google Play Console, navigate to:
   **Policy and programs > App content > Privacy Policy**.
2. Paste the specific URL for your app:
   ```text
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/?app=<your-app-id>
   ```
3. For the **Data Deletion URL** requirement (if your app supports user accounts):
   ```text
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/?app=<your-app-id>#retention-deletion
   ```

### Apple App Store Connect
1. In App Store Connect, go to **App Information > General Information**.
2. In the **Privacy Policy URL** field, paste:
   ```text
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/?app=<your-app-id>
   ```
3. In the **Terms of Use (EULA)** field (if applicable):
   ```text
   https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/terms.html?app=<your-app-id>
   ```

---

## 🛠 Adding a New App in `apps-config.js`

To add a new app, simply add an object to the `apps` array:

```javascript
{
  id: "my-new-app", // used in ?app=my-new-app
  name: "My New Application",
  tagline: "Short description of the app.",
  category: "Utilities",
  effectiveDate: "January 1, 2026",
  lastUpdated: "October 12, 2026",
  summary: "Brief explanation of how this app functions and respects user privacy.",
  hasUserAccounts: false,
  targetsChildren: false,
  minAge: 13,
  dataCollected: [
    {
      category: "Device Diagnostics",
      details: "Crash reports and OS version to maintain stability.",
      isOptional: false
    }
  ],
  permissions: [
    {
      name: "CAMERA",
      purpose: "Used to take photos within the app. No photos leave the device."
    }
  ],
  thirdPartyServices: ["googlePlayServices", "admob"],
  dataDeletionInstructions: "Uninstalling the app removes all stored data. For diagnostic telemetry purge, email support@yourdomain.com.",
  customNotes: "Photos are processed entirely on-device."
}
```

Commit and push your changes to GitHub, and your GitHub Pages site will update automatically!

---

## 📂 File Structure

```text
├── index.html        # Main Privacy Policy page with dynamic app switcher & legal sections
├── terms.html        # Terms of Service & EULA page
├── apps-config.js    # Developer details and app configurations
├── style.css         # Modern responsive styles, dark mode, and print stylesheet
├── script.js         # Client-side dynamic policy engine & interactive tools
└── README.md         # Documentation and GitHub Pages deployment guide
```
