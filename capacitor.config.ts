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
  },
};

export default config;
