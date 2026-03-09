'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { DayConfig, STOP_COLORS, ROUTE_STYLES } from '@/lib/types';
import { darkMapStyle } from '@/lib/map-styles';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'AIzaSyD5dF40cf_hC8j4cZeuJDc24T3gDwIWbfg';

interface Props {
  config: DayConfig;
  onStopClick?: (index: number) => void;
  activeStop?: number | null;
}

function MapContent({ config, onStopClick, activeStop }: Props) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const markersRef = useRef<google.maps.Marker[]>([]);
  const renderersRef = useRef<google.maps.DirectionsRenderer[]>([]);
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  // Place markers
  useEffect(() => {
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    config.stops.forEach((stop, i) => {
      const color = STOP_COLORS[stop.type];
      const label = stop.num.length <= 2 ? stop.num : '★';
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34">
        <circle cx="17" cy="17" r="14" fill="${color}" stroke="#0d0d0d" stroke-width="2.5"/>
        <text x="17" y="22" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="13" fill="#0d0d0d">${label}</text>
      </svg>`;

      const marker = new google.maps.Marker({
        position: stop.pos,
        map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
          scaledSize: new google.maps.Size(34, 34),
          anchor: new google.maps.Point(17, 17),
        },
        title: stop.title,
        zIndex: 100 + i,
      });

      marker.addListener('click', () => onStopClick?.(i));
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(m => m.setMap(null));
    };
  }, [map, config.stops, onStopClick]);

  // Bounce active marker
  useEffect(() => {
    markersRef.current.forEach((m, i) => {
      m.setAnimation(i === activeStop ? google.maps.Animation.BOUNCE : null);
    });
    if (activeStop !== null && activeStop !== undefined) {
      const timeout = setTimeout(() => {
        markersRef.current.forEach(m => m.setAnimation(null));
      }, 1400);
      return () => clearTimeout(timeout);
    }
  }, [activeStop]);

  // Draw routes
  useEffect(() => {
    if (!map || !routesLib) return;

    // Clear old
    renderersRef.current.forEach(r => r.setMap(null));
    renderersRef.current = [];
    polylinesRef.current.forEach(p => p.setMap(null));
    polylinesRef.current = [];

    const directionsService = new routesLib.DirectionsService();

    config.routes.forEach((route) => {
      const style = ROUTE_STYLES[route.mode];
      const fromPos = config.stops[route.from].pos;
      const toPos = config.stops[route.to].pos;

      if (route.mode === 'walking' || route.mode === 'driving') {
        const travelMode = route.mode === 'walking'
          ? google.maps.TravelMode.WALKING
          : google.maps.TravelMode.DRIVING;

        directionsService.route(
          {
            origin: fromPos,
            destination: toPos,
            travelMode,
            ...(route.waypoints && {
              waypoints: route.waypoints.map(wp => ({
                location: new google.maps.LatLng(wp.lat, wp.lng),
                stopover: false,
              })),
            }),
          },
          (result, status) => {
            if (status === 'OK' && result) {
              if (route.mode === 'walking') {
                // Walking: dotted line with walk icon
                const renderer = new google.maps.DirectionsRenderer({
                  map,
                  directions: result,
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: style.color,
                    strokeOpacity: 0,
                    strokeWeight: 0,
                    icons: [
                      {
                        icon: { path: 'M 0,-1 0,1', strokeOpacity: 0.8, strokeColor: style.color, scale: 2.5 },
                        offset: '0',
                        repeat: '10px',
                      },
                      {
                        icon: {
                          path: 'M -0.5,3 L -0.5,0 L 0.5,-1 L -0.3,-2.5 M -0.5,0 L -1.5,-1.5 M -0.5,0 L 0.5,-0.5',
                          strokeOpacity: 0.9,
                          strokeColor: style.color,
                          strokeWeight: 1.5,
                          scale: 3,
                          fillOpacity: 0,
                        },
                        offset: '50%',
                        repeat: '200px',
                      },
                    ],
                  },
                });
                renderersRef.current.push(renderer);
              } else {
                // Driving: solid thick line
                const renderer = new google.maps.DirectionsRenderer({
                  map,
                  directions: result,
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: style.color,
                    strokeOpacity: 0.85,
                    strokeWeight: 4,
                  },
                });
                renderersRef.current.push(renderer);
              }
            }
          },
        );
      } else if (route.mode === 'flight') {
        // Flight: dotted line, wide spacing
        const polyline = new google.maps.Polyline({
          path: [fromPos, toPos],
          map,
          strokeColor: style.color,
          strokeOpacity: 0,
          geodesic: true,
          icons: [
            {
              icon: { path: 'M 0,-1 0,1', strokeOpacity: 0.9, scale: 3 },
              offset: '0',
              repeat: '16px',
            },
            {
              icon: {
                path: 'M -2,0 L 0,-3 L 2,0 L 0,-0.5 Z',
                fillOpacity: 0.9,
                fillColor: style.color,
                strokeOpacity: 0,
                scale: 2.5,
                rotation: 0,
              },
              offset: '50%',
              repeat: '0',
            },
          ],
          strokeWeight: 2,
        });
        polylinesRef.current.push(polyline);
      } else {
        // Ferry, shuttle, subway — dashed line with mode-specific icons
        const path = route.waypoints
          ? [fromPos, ...route.waypoints, toPos]
          : [fromPos, toPos];

        const dashRepeat = route.mode === 'ferry' ? '14px' : '10px';
        const dashScale = route.mode === 'ferry' ? 3.5 : 3;

        const polyline = new google.maps.Polyline({
          path,
          map,
          strokeColor: style.color,
          strokeOpacity: 0,
          icons: [
            {
              icon: { path: 'M 0,-1 0,1', strokeOpacity: 0.9, strokeColor: style.color, scale: dashScale },
              offset: '0',
              repeat: dashRepeat,
            },
            {
              icon: {
                path: route.mode === 'ferry'
                  ? 'M -3,1 C -2,-1 2,-1 3,1 L 2.5,2 L -2.5,2 Z'  // boat shape
                  : 'M -2,0 L 2,0 L 2,-1.5 L -2,-1.5 Z',           // rectangle for subway/shuttle
                fillOpacity: 0.9,
                fillColor: style.color,
                strokeColor: '#0d0d0d',
                strokeWeight: 1,
                strokeOpacity: 0.5,
                scale: 2.5,
              },
              offset: '50%',
              repeat: '150px',
            },
          ],
          strokeWeight: 3,
          geodesic: true,
        });
        polylinesRef.current.push(polyline);
      }
    });

    return () => {
      renderersRef.current.forEach(r => r.setMap(null));
      polylinesRef.current.forEach(p => p.setMap(null));
    };
  }, [map, routesLib, config.routes, config.stops]);

  return null;
}

export default function DayMap({ config, onStopClick, activeStop }: Props) {
  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-white/10">
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={config.mapCenter}
          defaultZoom={config.mapZoom}
          gestureHandling="cooperative"
          disableDefaultUI
          zoomControl
          fullscreenControl
          styles={darkMapStyle}
        >
          <MapContent config={config} onStopClick={onStopClick} activeStop={activeStop} />
        </Map>
      </APIProvider>
    </div>
  );
}
