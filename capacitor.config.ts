import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "sushi.man.tracker",
  appName: "sushi-man-tracker",
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  server: {
    androidScheme: "http",
    cleartext: true,
    iosScheme: "http",
  },
  android: {
    path: "./platforms/android",
  },
  ios: {
    path: "./platforms/ios",
  },
  webDir: "dist",
};

export default config;
