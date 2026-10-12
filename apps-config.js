/**
 * Multi-Application Privacy Policy Configuration
 * 
 * You can customize the developer information and add/modify apps below.
 * Each app gets its own dedicated URL query parameter:
 * Example: https://<username>.github.io/<repo>/?app=taskmaster
 */

const POLICY_CONFIG = {
  // Global Developer / Organization Info
  developer: {
    name: "Your Developer Name / Studio",
    email: "support@yourdomain.com",
    website: "https://yourdomain.com",
    address: "Global / Remote Support",
    effectiveDate: "January 1, 2026",
    lastUpdated: "October 12, 2026"
  },

  // Available Third-Party Service Providers and their official privacy links
  availableThirdParties: {
    googlePlayServices: {
      name: "Google Play Services",
      url: "https://policies.google.com/privacy",
      purpose: "Core Android operating services, updates, and authentication."
    },
    admob: {
      name: "Google AdMob",
      url: "https://support.google.com/admob/answer/6128543?hl=en",
      purpose: "Serving contextual and personalized advertisements."
    },
    firebaseAnalytics: {
      name: "Google Analytics for Firebase",
      url: "https://firebase.google.com/policies/analytics",
      purpose: "App usage telemetry, crash metrics, and performance diagnostics."
    },
    firebaseCrashlytics: {
      name: "Firebase Crashlytics",
      url: "https://firebase.google.com/support/privacy",
      purpose: "Real-time crash reporting and diagnostic logs."
    },
    unityAds: {
      name: "Unity Ads",
      url: "https://unity.com/legal/privacy-policy",
      purpose: "Monetization and rewarded video ads."
    },
    facebookAudienceNetwork: {
      name: "Meta Audience Network",
      url: "https://www.facebook.com/about/privacy/",
      purpose: "Targeted advertising and campaign analytics."
    },
    revenueCat: {
      name: "RevenueCat",
      url: "https://www.revenuecat.com/privacy",
      purpose: "In-app purchase receipt validation and subscription management."
    },
    sentry: {
      name: "Sentry",
      url: "https://sentry.io/privacy/",
      purpose: "Error tracking, monitoring, and debugging."
    }
  },

  // General Master Policy (Shown when no specific app is selected)
  generalPolicy: {
    id: "general",
    name: "General Privacy Policy (All Applications & Services)",
    tagline: "Universal data protection and privacy standards across all our digital applications.",
    category: "General",
    effectiveDate: "January 1, 2026",
    lastUpdated: "October 12, 2026",
    summary: "This general privacy policy applies to all applications, games, utilities, and software published by our development studio, unless a specific application explicitly defines supplementary terms.",
    hasUserAccounts: false,
    targetsChildren: false,
    minAge: 13,
    dataCollected: [
      {
        category: "Device & Technical Identifiers",
        details: "Device model, operating system version, anonymous hardware identifiers, mobile carrier, language preferences, and IP address for diagnostic routing.",
        isOptional: false
      },
      {
        category: "Performance & Diagnostics Logs",
        details: "Crash traces, app startup speed, memory usage, and error codes used solely to diagnose software crashes and ensure stability.",
        isOptional: false
      },
      {
        category: "Aggregated Usage Metrics",
        details: "Anonymous screen view events, feature interaction counts, and session lengths to guide feature improvements.",
        isOptional: true
      }
    ],
    permissions: [
      {
        name: "Internet & Network State",
        purpose: "Enables cloud synchronization, network availability detection, and API communication."
      }
    ],
    thirdPartyServices: ["googlePlayServices", "firebaseAnalytics", "firebaseCrashlytics"],
    dataDeletionInstructions: "To request the deletion of any anonymous diagnostic telemetry associated with your device or installation, please contact us at support@yourdomain.com with your installation ID or advertising ID.",
    customNotes: "We believe privacy is a fundamental right. None of our general apps sell your personal data to third-party data brokers."
  },

  // Specific Apps Configuration
  // Add as many apps as you need!
  apps: [
    {
      id: "taskflow-pro",
      name: "TaskFlow Pro",
      tagline: "Smart productivity and task organization app.",
      category: "Productivity",
      effectiveDate: "March 15, 2026",
      lastUpdated: "October 10, 2026",
      summary: "TaskFlow Pro is a task management application designed with local-first privacy. Your to-dos and reminders are stored securely on your device.",
      hasUserAccounts: false,
      targetsChildren: false,
      minAge: 13,
      dataCollected: [
        {
          category: "Local Task Content",
          details: "Task titles, notes, and tags. All stored strictly locally on your device storage unless you choose cloud backup.",
          isOptional: false
        },
        {
          category: "Anonymous Diagnostics",
          details: "Crash logs and performance traces to fix bugs.",
          isOptional: false
        }
      ],
      permissions: [
        {
          name: "POST_NOTIFICATIONS (Android 13+)",
          purpose: "Allows the app to trigger timely reminders and task alarms you set."
        },
        {
          name: "SCHEDULE_EXACT_ALARM",
          purpose: "Required to ensure your task reminders ring at the exact minute specified."
        }
      ],
      thirdPartyServices: ["googlePlayServices", "firebaseCrashlytics"],
      dataDeletionInstructions: "Since TaskFlow Pro stores data locally on your device, uninstalling the app or clearing the app storage via your device settings permanently wipes all task data. For diagnostic log deletion, email support@yourdomain.com.",
      customNotes: "TaskFlow Pro does not require an account, does not read your contacts, and does not monitor other apps."
    },

    {
      id: "pixel-runner-game",
      name: "Pixel Runner: Retro Arcade",
      tagline: "Endless retro action runner mobile game.",
      category: "Games",
      effectiveDate: "June 1, 2026",
      lastUpdated: "September 20, 2026",
      summary: "Pixel Runner is an arcade game supported by non-intrusive advertisements and Google Play Game Services leaderboards.",
      hasUserAccounts: false,
      targetsChildren: false,
      minAge: 13,
      dataCollected: [
        {
          category: "Advertising Identifiers (AAID / IDFA)",
          details: "Anonymous advertising IDs processed by ad networks to deliver relevant ads or limit ad frequency.",
          isOptional: false
        },
        {
          category: "Game Progress & High Scores",
          details: "High scores, character unlocks, and achievement progress synced with Google Play Games / Apple Game Center.",
          isOptional: true
        }
      ],
      permissions: [
        {
          name: "INTERNET & ACCESS_NETWORK_STATE",
          purpose: "Used to connect to leaderboards, cloud saves, and fetch advertisements."
        },
        {
          name: "VIBRATE",
          purpose: "Provides haptic feedback during game action sequences."
        }
      ],
      thirdPartyServices: ["googlePlayServices", "admob", "unityAds", "firebaseAnalytics"],
      dataDeletionInstructions: "You can reset your advertising identifier in your Android or iOS device settings at any time. To remove high scores from public leaderboards, manage your profile in the Google Play Games / Game Center app.",
      customNotes: "Ad partners may collect anonymous device information as outlined in their respective privacy policies linked below."
    },

    {
      id: "fitscan-tracker",
      name: "FitScan Nutrition & Scanner",
      tagline: "Barcode scanner and personal health journal.",
      category: "Health & Fitness",
      effectiveDate: "January 10, 2026",
      lastUpdated: "October 01, 2026",
      summary: "FitScan enables food barcode scanning and nutrition tracking. We treat health metrics with utmost privacy and never share them with insurers or advertisers.",
      hasUserAccounts: true,
      targetsChildren: false,
      minAge: 16,
      dataCollected: [
        {
          category: "Account Information",
          details: "Email address and username if you opt to create a sync account.",
          isOptional: true
        },
        {
          category: "Camera Feed (Barcode Scanning)",
          details: "Real-time camera view is processed entirely on-device to read standard EAN/UPC barcodes. No camera frames or video are recorded or uploaded to servers.",
          isOptional: false
        },
        {
          category: "Dietary Logs & Nutrition Goals",
          details: "Caloric intake and food log records.",
          isOptional: false
        }
      ],
      permissions: [
        {
          name: "CAMERA",
          purpose: "Used exclusively to scan barcodes on food packaging in real time. We do not store or transmit photo or video data."
        },
        {
          name: "POST_NOTIFICATIONS",
          purpose: "Optional reminders to log daily water intake and meals."
        }
      ],
      thirdPartyServices: ["googlePlayServices", "firebaseAnalytics", "sentry"],
      dataDeletionInstructions: "FitScan provides an in-app 'Delete Account & All Data' button in Settings > Privacy. Alternatively, email support@yourdomain.com with the subject 'Delete FitScan Account' and your registered email address. All user data is purged within 30 days.",
      customNotes: "Camera access is purely on-device and can be revoked at any time via system settings without breaking non-camera app features."
    }
  ]
};
