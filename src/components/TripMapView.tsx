'use client';

import { useEffect, useRef } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { darkMapStyle } from '@/lib/map-styles';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyD5dF40cf_hC8j4cZeuJDc24T3gDwIWbfg';

const ROUTE_POINTS = [
  { lat: 40.1792, lng: 44.5126, label: 'Ереван', day: 0, color: '#c8c0b4' },
  { lat: 40.7128, lng: -74.006, label: 'Нью-Йорк', day: 1, color: '#e8c87a' },
  { lat: 36.1097, lng: -115.174, label: 'Лас-Вегас', day: 5, color: '#e07040' },
  { lat: 37.2982, lng: -113.026, label: 'Zion', day: 6, color: '#e07040' },
  { lat: 36.9833, lng: -110.114, label: 'Monument Valley', day: 7, color: '#e07040' },
  { lat: 36.8619, lng: -111.374, label: 'Page', day: 8, color: '#e07040' },
  { lat: 36.0544, lng: -112.140, label: 'Grand Canyon', day: 9, color: '#e07040' },
  { lat: 34.0522, lng: -118.244, label: 'Лос-Анджелес', day: 11, color: '#64b4ff' },
  { lat: 20.7984, lng: -156.332, label: 'Мауи', day: 14, color: '#40c8a0' },
];

function MapContent() {
  const map = useMap();
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    // Fit bounds to all US points (skip Yerevan for better zoom)
    const bounds = new google.maps.LatLngBounds();
    ROUTE_POINTS.slice(1).forEach(p => bounds.extend(p));
    map.fitBounds(bounds, 60);

    // Markers
    ROUTE_POINTS.slice(1).forEach((point) => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <circle cx="14" cy="14" r="11" fill="${point.color}" stroke="#0d0d0d" stroke-width="2"/>
        <text x="14" y="18" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="10" fill="#0d0d0d">${point.day}</text>
      </svg>`;

      const marker = new google.maps.Marker({
        position: point,
        map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
          scaledSize: new google.maps.Size(28, 28),
          anchor: new google.maps.Point(14, 14),
        },
        title: `День ${point.day}: ${point.label}`,
      });

      marker.addListener('click', () => {
        const el = document.getElementById(`day-${point.day}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      markersRef.current.push(marker);
    });

    // Route line (US points only)
    const usPoints = ROUTE_POINTS.slice(1);
    new google.maps.Polyline({
      path: usPoints,
      map,
      strokeColor: '#e8c87a',
      strokeOpacity: 0.6,
      strokeWeight: 2,
      geodesic: true,
    });

    return () => {
      markersRef.current.forEach(m => m.setMap(null));
    };
  }, [map]);

  return null;
}

export default function TripMapView() {
  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden border border-white/10">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={{ lat: 36.5, lng: -110 }}
          defaultZoom={5}
          gestureHandling="cooperative"
          disableDefaultUI
          zoomControl
          styles={darkMapStyle}
        >
          <MapContent />
        </Map>
      </APIProvider>
    </div>
  );
}
