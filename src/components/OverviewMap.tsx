'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { darkMapStyle } from '@/lib/map-styles';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyD5dF40cf_hC8j4cZeuJDc24T3gDwIWbfg';

interface City {
  name: string;
  pos: { lat: number; lng: number };
  color: string;
  region: string;
}

const CITIES: City[] = [
  { name: 'Нью-Йорк', pos: { lat: 40.7128, lng: -74.006 }, color: '#e8c87a', region: 'new-york' },
  { name: 'Лас-Вегас', pos: { lat: 36.1699, lng: -115.1398 }, color: '#e07040', region: 'vegas-parks' },
  { name: 'Зайон', pos: { lat: 37.2982, lng: -113.0263 }, color: '#e07040', region: 'vegas-parks' },
  { name: 'Долина Монументов', pos: { lat: 36.9984, lng: -110.0985 }, color: '#e07040', region: 'vegas-parks' },
  { name: 'Гранд-Каньон', pos: { lat: 36.0544, lng: -112.1401 }, color: '#e07040', region: 'vegas-parks' },
  { name: 'Лос-Анджелес', pos: { lat: 34.0522, lng: -118.2437 }, color: '#64b4ff', region: 'los-angeles' },
  { name: 'Мауи', pos: { lat: 20.7984, lng: -156.3319 }, color: '#40c8a0', region: 'maui' },
];

const ROUTE_PATH = [
  { lat: 40.7128, lng: -74.006 },     // NY
  { lat: 36.1699, lng: -115.1398 },    // Vegas
  { lat: 37.2982, lng: -113.0263 },    // Zion
  { lat: 36.9984, lng: -110.0985 },    // Monument Valley
  { lat: 36.0544, lng: -112.1401 },    // Grand Canyon
  { lat: 34.0522, lng: -118.2437 },    // LA
  { lat: 20.7984, lng: -156.3319 },    // Maui
  { lat: 34.0522, lng: -118.2437 },    // LA (return)
];

export default function OverviewMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!API_KEY || !mapRef.current) return;

    // Load Google Maps script if not already loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');

    const initMap = () => {
      if (!mapRef.current || !window.google?.maps) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 36, lng: -98 },
        zoom: 4,
        styles: darkMapStyle as google.maps.MapTypeStyle[],
        disableDefaultUI: true,
        gestureHandling: 'cooperative',
        backgroundColor: '#1a1a2e',
      });

      // Draw route line
      new google.maps.Polyline({
        path: ROUTE_PATH,
        geodesic: true,
        strokeColor: '#e8c87a',
        strokeOpacity: 0.3,
        strokeWeight: 2,
        map,
      });

      // Add city markers
      CITIES.forEach(city => {
        const marker = new google.maps.Marker({
          position: city.pos,
          map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6,
            fillColor: city.color,
            fillOpacity: 0.9,
            strokeColor: city.color,
            strokeWeight: 1,
            strokeOpacity: 0.3,
          },
          title: city.name,
        });

        // Label
        new google.maps.Marker({
          position: city.pos,
          map,
          icon: {
            path: 'M 0 0',
            scale: 0,
          },
          label: {
            text: city.name,
            color: '#f0ebe3',
            fontSize: '10px',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: '500',
            className: 'map-city-label',
          },
          clickable: false,
        });
      });

      setMapLoaded(true);
    };

    if (existingScript && window.google?.maps) {
      initMap();
    } else if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      // Script exists but not loaded yet
      existingScript.addEventListener('load', initMap);
    }
  }, []);

  if (!API_KEY) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: mapLoaded ? 1 : 0, y: mapLoaded ? 0 : 20 }}
      transition={{ duration: 0.8, delay: 1.0 }}
      className="w-full max-w-2xl mx-auto mt-8 rounded-xl overflow-hidden border border-white/5"
      style={{ height: '220px' }}
    >
      <div ref={mapRef} className="w-full h-full" />
    </motion.div>
  );
}
