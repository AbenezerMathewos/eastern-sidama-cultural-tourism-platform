import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CulturalMap from "@/components/CulturalMap";
import CulturalAudioPlayer from "@/components/CulturalAudioPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { experiencesAPI } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import { SIDAMA_CULTURAL_LANDMARKS, resolveExperienceCoordinates } from "@/lib/geo";
import {
  MapPin,
  Search,
  Compass,
  Star,
  Loader2,
  Layers,
  Coffee,
  Trees,
  Home,
  Utensils
} from "lucide-react";

const ExploreMap = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);

  const ZONES = [
    { id: "all", label: "All Eastern Sidama" },
    { id: "Hawassa", label: "Hawassa & Lake" },
    { id: "Yirgalem", label: "Yirgalem & Dale" },
    { id: "Wondo Genet", label: "Wondo Genet" },
    { id: "Aleta Wendo", label: "Aleta Wendo" },
    { id: "Bensa", label: "Bensa & Daye" },
  ];

  const CATEGORIES = [
    { id: "all", label: "All Categories", icon: Layers },
    { id: "coffee", label: "Coffee Heritage", icon: Coffee },
    { id: "nature", label: "Nature & Springs", icon: Trees },
    { id: "homestay", label: "Cultural Stays", icon: Home },
    { id: "food", label: "Food & Cooking", icon: Utensils },
  ];

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const resp = await experiencesAPI.getAll();
        const data = resp.data?.data || resp.data || [];
        setExperiences(data);
        if (data.length > 0) {
          setSelectedExperience(data[0]);
        }
      } catch (err) {
        console.error("Failed to load experiences for map:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      const title = (exp.title || "").toLowerCase();
      const loc = (exp.location || "").toLowerCase();
      const desc = (exp.description || "").toLowerCase();
      const summary = (exp.summary || "").toLowerCase();
      const fullText = `${title} ${loc} ${desc} ${summary}`;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!fullText.includes(q)) return false;
      }

      // Zone filter
      if (selectedZone !== "all") {
        const zoneLower = selectedZone.toLowerCase();
        if (!fullText.includes(zoneLower)) return false;
      }

      // Category filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "coffee" && !fullText.includes("coffee") && !fullText.includes("bunna")) return false;
        if (selectedCategory === "nature" && !fullText.includes("nature") && !fullText.includes("spring") && !fullText.includes("lake") && !fullText.includes("forest")) return false;
        if (selectedCategory === "homestay" && !fullText.includes("home") && !fullText.includes("stay") && !fullText.includes("village")) return false;
        if (selectedCategory === "food" && !fullText.includes("food") && !fullText.includes("cook") && !fullText.includes("injera")) return false;
      }

      return true;
    });
  }, [experiences, searchQuery, selectedZone, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 pt-16">
        <PageHeader
          title={
            <>
              Interactive Map of <span className="text-primary">Eastern Sidama</span>
            </>
          }
          description="Explore authentic cultural destinations, coffee heritage forests, community homestays, and natural thermal springs across Eastern Sidama."
        />

        <div className="container mx-auto px-4 py-8">
          {/* Controls Bar: Search & Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search towns, coffee groves, cultural sites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={showLandmarks ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setShowLandmarks(!showLandmarks)}
                  className="text-xs"
                >
                  <Compass className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  {showLandmarks ? "Hide Heritage Sites" : "Show Heritage Sites"}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {filteredExperiences.length} experiences found
                </span>
              </div>
            </div>

            {/* Zone Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-semibold text-muted-foreground uppercase mr-1 whitespace-nowrap">
                Zone:
              </span>
              {ZONES.map((zone) => (
                <Button
                  key={zone.id}
                  size="sm"
                  variant={selectedZone === zone.id ? "adventure" : "outline"}
                  onClick={() => setSelectedZone(zone.id)}
                  className="rounded-full text-xs h-8 px-3.5 flex-shrink-0"
                >
                  {zone.label}
                </Button>
              ))}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-semibold text-muted-foreground uppercase mr-1 whitespace-nowrap">
                Type:
              </span>
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.id}
                    size="sm"
                    variant={selectedCategory === cat.id ? "secondary" : "ghost"}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="rounded-full text-xs h-7 px-3 flex-shrink-0 gap-1.5"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Main Map + Listings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Experience Listings (5 cols on large screens) */}
            <div className="lg:col-span-5 space-y-4 max-h-[650px] overflow-y-auto pr-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-3">
                  <Loader2 className="w-7 h-7 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading Eastern Sidama places...</p>
                </div>
              ) : filteredExperiences.length === 0 ? (
                <div className="text-center py-16 px-4 bg-muted/40 rounded-xl border border-border">
                  <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h4 className="font-semibold text-foreground mb-1">No experiences in this area</h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Try clearing your search or picking "All Eastern Sidama".
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedZone("all");
                      setSelectedCategory("all");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                filteredExperiences.map((exp) => {
                  const isSelected = selectedExperience?._id === exp._id || selectedExperience?.id === exp.id;
                  const expId = exp._id || exp.id;
                  return (
                    <Card
                      key={expId}
                      onClick={() => setSelectedExperience(exp)}
                      className={`cursor-pointer transition-all duration-200 border ${
                        isSelected
                          ? "border-primary ring-2 ring-primary/20 shadow-md bg-accent/40"
                          : "border-border hover:border-primary/40 hover:shadow-sm"
                      }`}
                    >
                      <CardContent className="p-3 flex gap-3">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative bg-muted">
                          <img
                            src={resolveMediaUrl(
                              exp.imageCover || (exp.images && exp.images[0]),
                              "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=300"
                            )}
                            alt={exp.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=300";
                            }}
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex items-center gap-1 text-xs text-secondary font-semibold mb-0.5">
                              <Star className="w-3 h-3 fill-current" />
                              <span>{exp.ratingsAverage ? Number(exp.ratingsAverage).toFixed(1) : "5.0"}</span>
                              <span className="text-muted-foreground font-normal">
                                ({exp.ratingsQuantity || 0})
                              </span>
                              <span className="text-muted-foreground font-normal mx-1">·</span>
                              <span className="text-muted-foreground font-normal truncate">
                                {exp.duration}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-foreground truncate group-hover:text-primary">
                              {exp.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {exp.summary}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/50">
                            <div>
                              <span className="text-sm font-bold text-foreground">
                                ETB {exp.price}
                              </span>
                              <span className="text-[10px] text-muted-foreground ml-1">/ guest</span>
                            </div>
                            <Button asChild size="sm" variant="ghost" className="h-7 text-xs px-2 text-primary">
                              <Link to={`/experiences/${expId}`}>View & Book &rarr;</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}

              <CulturalAudioPlayer className="mt-4" />
            </div>

            {/* Right Column: Leaflet Map (7 cols on large screens) */}
            <div className="lg:col-span-7 sticky top-24">
              <CulturalMap
                experiences={filteredExperiences}
                landmarks={SIDAMA_CULTURAL_LANDMARKS}
                selectedExperienceId={selectedExperience?._id || selectedExperience?.id}
                onSelectExperience={(exp) => setSelectedExperience(exp)}
                showLandmarks={showLandmarks}
                height="650px"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExploreMap;
