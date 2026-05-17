import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.esante.lechateaudejolyne',
  appName: 'Le Château de Jolyne',
  webDir: 'dist',
  server: { androidScheme: 'https' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false,
    },
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#000000',
    },
    // M2 — Google Sign-In
    // Replace YOUR_WEB_CLIENT_ID with the Web Application OAuth client ID from:
    // Google Cloud Console → APIs & Services → Credentials → Web client (auto-created by Firebase)
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
      forceCodeForRefreshToken: false,
    },
  },
};

export default config;
