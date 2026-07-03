"use client";

import { useState, useEffect, useCallback } from "react";
import { Coordinates } from "@/lib/types";
import { DEFAULT_CENTER } from "@/config/constants";

export function useLocation() {
  const [location, setLocation] = useState<Coordinates>(DEFAULT_CENTER);
  const [isUsingGeolocation, setIsUsingGeolocation] = useState(false);
  const [permissionState, setPermissionState] = useState<
    "prompt" | "granted" | "denied" | "unavailable"
  >("prompt");

  const requestGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setPermissionState("unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setIsUsingGeolocation(true);
        setPermissionState("granted");
      },
      () => {
        setPermissionState("denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const setCustomLocation = useCallback((coords: Coordinates) => {
    setLocation(coords);
    setIsUsingGeolocation(false);
  }, []);

  useEffect(() => {
    requestGeolocation();
  }, [requestGeolocation]);

  return {
    location,
    isUsingGeolocation,
    permissionState,
    requestGeolocation,
    setCustomLocation,
  };
}
