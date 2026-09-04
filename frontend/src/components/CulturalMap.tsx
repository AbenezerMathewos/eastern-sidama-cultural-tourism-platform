import { useEffect, useRef, useState } from "react";
import { resolveExperienceCoordinates, SIDAMA_MAP_CENTER, SIDAMA_DEFAULT_ZOOM, SIDAMA_CULTURAL_LANDMARKS, CulturalLandmark } from "@/lib/geo";
import { resolveMediaUrl } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { Loader2, Maximize2, RotateCcw, MapPin, Compass } from "lucide-react";

declare global {
  interface Window {
    L: any;
  }
}

interface CulturalMapProps {
  experiences?: any[];
  landmarks?: CulturalLandmark[];
  selectedExperienceId?: string | null;
  onSelectExperience?: (experience: any) => void;
  showLandmarks?: boolean;
  className?: string;
  height?: string;
  center?: [number, number];
  zoom?: number;
}

const CulturalMap = ({
  experiences = [],
  landmarks = SIDAMA_CULTURAL_LANDMARKS,
  selectedExperienceId,
  onSelectExperience,
  showLandmarks = true,
  className = "",
  height = "550px",
  center = SIDAMA_MAP_CENTER,
  zoom = SIDAMA_DEFAULT_ZOOM,
}: CulturalMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize Map
  useEffect(() => {
    let checkInterval: any = null;

    const initMap = () => {
      if (!window.L || !mapContainerRef.current) return false;
      if (mapInstanceRef.current) return true;

      try {
        const map = window.L.map(mapContainerRef.current, {
          center: center,
          zoom: zoom,
          scrollWheelZoom: true,
          zoomControl: true,
        });

        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        mapInstanceRef.current = map;
        setIsMapReady(true);
        return true;
      } catch (err) {
        console.error("Error initializing Leaflet map:", err);
        return false;
      }
    };

    if (!initMap()) {
      checkInterval = setInterval(() => {
        if (initMap()) {
          clearInterval(checkInterval);
        }
      }, 200);
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when experiences, landmarks, or selectedExperienceId changes
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || !window.L) return;

    const map = mapInstanceRef.current;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = window.L.latLngBounds([]);

    // 1. Add Experience Markers
    experiences.forEach((exp, idx) => {
      const coords = resolveExperienceCoordinates(exp, idx);
      const isSelected = selectedExperienceId === String(exp._id || exp.id);
      bounds.extend(coords);

      const customIcon = window.L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${isSelected ? "#dc2626" : "#0284c7"};
            color: white;
            width: ${isSelected ? "38px" : "32px"};
            height: ${isSelected ? "38px" : "32px"};
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            font-weight: bold;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
          ">
            ☕
          </div>
        `,
        iconSize: [isSelected ? 38 : 32, isSelected ? 38 : 32],
        iconAnchor: [isSelected ? 19 : 16, isSelected ? 19 : 16],
      });

      const marker = window.L.marker(coords, { icon: customIcon }).addTo(map);

      const expImage = resolveMediaUrl(
        exp.imageCover || (exp.images && exp.images[0]),
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400"
      );

      const popupHtml = `
        <div style="max-width: 240px; font-family: sans-serif;">
          <div style="width: 100%; height: 120px; overflow: hidden; border-radius: 8px; margin-bottom: 8px;">
            <img src="${expImage}" alt="${exp.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #1e293b; line-height: 1.2;">
            ${exp.title}
          </h4>
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b; line-height: 1.3;">
            ${exp.summary ? exp.summary.slice(0, 80) + "..." : ""}
          </p>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-weight: 700; color: #0284c7; font-size: 13px;">
              ETB ${exp.price || 0}
            </span>
            <span style="font-size: 11px; color: #475569;">
              ★ ${exp.ratingsAverage ? Number(exp.ratingsAverage).toFixed(1) : "5.0"}
            </span>
          </div>
          <a href="/experiences/${exp._id || exp.id}" style="
            display: block;
            text-align: center;
            background: #0284c7;
            color: white;
            text-decoration: none;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
          ">
            View Experience
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 260 });

      marker.on("click", () => {
        if (onSelectExperience) {
          onSelectExperience(exp);
        }
      });

      if (isSelected) {
        marker.openPopup();
      }

      markersRef.current.push(marker);
    });

    // 2. Add Landmark Markers
    if (showLandmarks && landmarks.length > 0) {
      landmarks.forEach((landmark) => {
        const landmarkCoords: [number, number] = [landmark.lat, landmark.lng];
        bounds.extend(landmarkCoords);

        const landmarkIcon = window.L.divIcon({
          className: "custom-landmark-marker",
          html: `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              background: #16a34a;
              color: white;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              font-size: 12px;
              cursor: pointer;
            ">
              🌿
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const landmarkMarker = window.L.marker(landmarkCoords, {
          icon: landmarkIcon,
        }).addTo(map);

        const landmarkPopup = `
          <div style="max-width: 220px; font-family: sans-serif;">
            <span style="display: inline-block; background: #dcfce7; color: #166534; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-bottom: 4px; text-transform: uppercase;">
              Cultural Site (${landmark.zone})
            </span>
            <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #0f172a;">
              ${landmark.name}
            </h4>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #475569; line-height: 1.3;">
              ${landmark.description}
            </p>
            <div style="font-size: 10px; color: #15803d; font-weight: 600;">
              ✨ ${landmark.highlight}
            </div>
          </div>
        `;

        landmarkMarker.bindPopup(landmarkPopup, { maxWidth: 240 });
        markersRef.current.push(landmarkMarker);
      });
    }

    // Auto-fit bounds if markers exist
    if (bounds.isValid() && experiences.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }, [isMapReady, experiences, landmarks, selectedExperienceId, showLandmarks]);

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(center, zoom);
    }
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-border shadow-md bg-muted ${className}`}>
      {!isMapReady && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
          <p className="text-sm font-medium text-muted-foreground">
            Loading Eastern Sidama Map...
          </p>
        </div>
      )}

      {/* Map Control Buttons */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          onClick={handleResetView}
          title="Reset map to Eastern Sidama center"
          className="shadow-md bg-background/90 hover:bg-background backdrop-blur-sm"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-background/90 backdrop-blur-sm border border-border rounded-lg p-2.5 shadow-md text-xs space-y-1.5 hidden sm:block">
        <div className="font-semibold text-foreground flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-primary" /> Map Legend
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="inline-block w-3 h-3 rounded-full bg-[#0284c7] border border-white"></span>
          Cultural Experiences & Stays
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="inline-block w-3 h-3 rounded-full bg-[#16a34a] border border-white"></span>
          Heritage Sites & Natural Wonders
        </div>
      </div>

      {/* Leaflet container */}
      <div
        ref={mapContainerRef}
        style={{ height, width: "100%", zIndex: 1 }}
      />
    </div>
  );
};

export default CulturalMap;
