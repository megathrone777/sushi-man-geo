import React, { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { KeepAwake } from "@capacitor-community/keep-awake";

import { socket } from "./socket";

const App: React.FC = () => {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  useEffect((): void => {
    Geolocation.requestPermissions();

    const init = async (): Promise<void> => {
      await KeepAwake.keepAwake();
      await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 3000,
        },
        (position): void => {
          if (position) {
            const {
              coords: { latitude, longitude },
            } = position;

            setCoords({
              latitude,
              longitude,
            });
            socket.emit("update-coords", 1, latitude, longitude);
          }
        }
      );
    };

    init();
  }, []);

  return (
    <div>
      {coords.latitude > 0 && coords.longitude > 0 && (
        <React.Fragment>
          <p>Latitude: {coords.latitude}</p>
          <p>Longitude: {coords.longitude}</p>
        </React.Fragment>
      )}
    </div>
  );
};

export { App };
