import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { bookingsAPI, wishlistAPI } from "@/lib/api"; 
import { resolveMediaUrl } from "@/lib/media";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface TourCardProps {
  tour: {
    _id?: string;
    id?: string | number;
    title: string;
    duration: string;
    maxGuests?: number;
    ratingsAverage?: number; // Made optional to prevent crash
    ratingsQuantity?: number; // Made optional to prevent crash
    price: number;
    summary: string;
    imageCover: string;
  };
  initialWishlisted?: boolean;
  onWishlistChange?: (tourId: string, isSaved: boolean) => void;
}

const TourCard = ({ tour, initialWishlisted, onWishlistChange }: TourCardProps) => {
  const [available, setAvailable] = useState<number | null>(null);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(!!initialWishlisted);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const tourId = String(tour._id ?? tour.id ?? "");
  const fallbackImage = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600";

  useEffect(() => {
    if (initialWishlisted !== undefined) {
      setIsWishlisted(initialWishlisted);
    }
  }, [initialWishlisted]);

  useEffect(() => {
    const load = async () => {
      // Logic check to ensure ID exists before calling API
      if (!tourId) return;

      try {
        const resp = await bookingsAPI.getAvailability(tourId);
        const data = resp?.data || resp;
        const a = data?.data || data;
        setAvailable(typeof a?.available === 'number' ? a.available : null);
      } catch (err) {
        setAvailable(null);
      }
    };
    load();
  }, [tourId]);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please log in to save experiences to your wishlist.",
      });
      navigate("/login");
      return;
    }

    if (!tourId || isTogglingWishlist) return;

    setIsTogglingWishlist(true);
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    try {
      const resp = await wishlistAPI.toggleWishlist(tourId);
      const serverState = resp?.inWishlist ?? nextState;
      setIsWishlisted(serverState);
      if (onWishlistChange) {
        onWishlistChange(tourId, serverState);
      }
      toast({
        title: serverState ? "Saved to Wishlist" : "Removed from Wishlist",
        description: serverState
          ? `Added "${tour.title}" to your saved experiences.`
          : `Removed "${tour.title}" from your wishlist.`,
      });
    } catch (err: any) {
      setIsWishlisted(!nextState);
      toast({
        title: "Wishlist update failed",
        description:
          err.response?.data?.message || "Could not update wishlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/experiences/${tour._id ?? tour.id}`}>
        <Card className="group overflow-hidden cursor-pointer hover-lift shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 hover:border-primary/30 h-full">
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            <img
              src={resolveMediaUrl(tour.imageCover, fallbackImage)}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600";
              }}
            />
            <button
              type="button"
              onClick={handleWishlistClick}
              disabled={isTogglingWishlist}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background text-foreground backdrop-blur-md shadow-md transition-all duration-200 hover:scale-110 active:scale-95 z-10"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlisted
                    ? "fill-rose-500 text-rose-500"
                    : "text-muted-foreground hover:text-rose-500"
                }`}
              />
            </button>
          </div>

          <CardContent className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold text-base text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {tour.title}
              </h3>
              <div className="flex items-center gap-1.5 text-sm">
                <Star className="w-3.5 h-3.5 text-secondary fill-secondary flex-shrink-0" />
                <span className="font-medium text-foreground">
                  {/* FIXED: Added check for ratingsAverage to prevent white screen */}
                  {tour.ratingsAverage ? Number(tour.ratingsAverage).toFixed(1) : "0.0"}
                </span>
                <span className="text-muted-foreground">
                  ({tour.ratingsQuantity || 0})
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-xs">
                  {tour.duration}
                </span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm line-clamp-2 mb-3 leading-relaxed h-10">
              {tour.summary}
            </p>

            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-foreground">
                ETB {tour.price}
              </span>
              <span className="text-xs text-muted-foreground">/guest</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default TourCard;
