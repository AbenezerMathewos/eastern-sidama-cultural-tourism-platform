import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { wishlistAPI } from "@/lib/api";
import { Heart, Compass, Search, Loader2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const fetchWishlist = async () => {
    try {
      const res = await wishlistAPI.getWishlist();
      const list = res?.data?.wishlist || [];
      setWishlist(list);
    } catch (err: any) {
      toast({
        title: "Error loading wishlist",
        description:
          err.response?.data?.message || "Could not retrieve your saved experiences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleWishlistChange = (experienceId: string, isSaved: boolean) => {
    if (!isSaved) {
      setWishlist((prev) =>
        prev.filter(
          (item) => String(item._id || item.id) !== String(experienceId)
        )
      );
    }
  };

  const handleClearAll = async () => {
    if (wishlist.length === 0 || isClearing) return;
    setIsClearing(true);
    try {
      await Promise.all(
        wishlist.map((item) =>
          wishlistAPI.removeFromWishlist(String(item._id || item.id))
        )
      );
      setWishlist([]);
      toast({
        title: "Wishlist cleared",
        description: "All saved experiences have been removed from your wishlist.",
      });
    } catch (err) {
      toast({
        title: "Error clearing wishlist",
        description: "Some items may not have been removed.",
        variant: "destructive",
      });
      fetchWishlist();
    } finally {
      setIsClearing(false);
    }
  };

  const filteredList = wishlist.filter((tour) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      tour.title?.toLowerCase().includes(term) ||
      tour.summary?.toLowerCase().includes(term) ||
      tour.location?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 pt-16">
        <PageHeader
          title="My Saved Experiences"
          description="Keep track of authentic cultural tours, community stays, and local activities you want to experience."
        />

        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading your saved experiences...</p>
            </div>
          ) : wishlist.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-16 px-4 bg-muted/30 rounded-2xl border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                You haven't saved any experiences yet. Browse our vibrant Eastern Sidama tours, cultural ceremonies, and homestays and tap the heart icon to save them for later.
              </p>
              <Button asChild size="lg" variant="hero">
                <Link to="/experiences" className="gap-2">
                  <Compass className="w-5 h-5" />
                  Explore Experiences
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Controls: Search and Clear */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search saved experiences..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    {wishlist.length} {wishlist.length === 1 ? "experience" : "experiences"} saved
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}
                    disabled={isClearing}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 mr-1.5" />
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Grid of Wishlist Experiences */}
              {filteredList.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">
                    No saved experiences match "{searchTerm}".
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Filter
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredList.map((tour) => (
                    <TourCard
                      key={tour._id || tour.id}
                      tour={tour}
                      initialWishlisted={true}
                      onWishlistChange={handleWishlistChange}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
