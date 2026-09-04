import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookingsAPI, experienceGuidesAPI, experiencesAPI, reviewsAPI, wishlistAPI } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import {
  ArrowLeft,
  Check,
  Heart,
  Loader2,
  Map as MapIcon,
  MessageSquare,
  Minus,
  Plus,
  Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TourDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [experience, setExperience] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numGuests, setNumGuests] = useState<number>(1);
  const [availability, setAvailability] = useState<any>(null);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [hasBooked, setHasBooked] = useState<boolean>(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [availableGuides, setAvailableGuides] = useState<any[]>([]);
  const [guideRequirement, setGuideRequirement] = useState<string>("optional");
  const [selectedGuideId, setSelectedGuideId] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState<boolean>(false);

  // 1. Fetch Experience and Availability
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [expRes, availRes] = await Promise.all([
          experiencesAPI.getById(id),
          bookingsAPI.getAvailability(id)
        ]);
        setExperience(expRes.data.data);
        setAvailability(availRes.data?.data || availRes.data);

        try {
          const guidesRes = await experienceGuidesAPI.getSelectableGuides(id);
          const payload = guidesRes.data || guidesRes;
          setGuideRequirement(payload.guideRequirement || expRes.data.data?.guideRequirement || "optional");
          setAvailableGuides(payload.guides || []);
          if (payload.guides?.length === 1) {
            setSelectedGuideId(String(payload.guides[0]._id || payload.guides[0].id));
          }
        } catch {
          setGuideRequirement(expRes.data.data?.guideRequirement || "optional");
          setAvailableGuides([]);
        }
      } catch (err) {
        toast({ title: "Error", description: "Failed to load details.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, toast]);

  // 2. Check Booking and Review Status
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!id || !experience) return;
      try {
        const reviewResp = await reviewsAPI.getByExperience(id);
        const fetchedReviews = reviewResp.data?.data || reviewResp.data || [];
        setReviews(fetchedReviews);

        if (isAuthenticated && user) {
          const bookResp = await bookingsAPI.getMyBookings();
          const bookings = bookResp.data?.data || bookResp.data || [];
          setHasBooked(bookings.some((b: any) => String(b.experience?._id || b.experience) === String(experience._id)));
          
          const currentUserId = (user as any)._id || (user as any).id;
          setHasUserReviewed(fetchedReviews.some((r: any) => String(r.user?._id || r.user) === String(currentUserId)));
        }
      } catch (e) { 
        console.error("Status check failed", e); 
      }
    };
    checkUserStatus();
  }, [experience, isAuthenticated, id, user]);

  // 3. Check Wishlist Status
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!isAuthenticated || !id) return;
      try {
        const res = await wishlistAPI.getWishlist();
        const list = res?.data?.wishlist || [];
        const found = list.some(
          (item: any) => String(item._id || item.id) === String(id)
        );
        setIsWishlisted(found);
      } catch (err) {
        // silent fail
      }
    };
    checkWishlistStatus();
  }, [id, isAuthenticated]);

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please log in to save experiences to your wishlist.",
      });
      return navigate("/login");
    }

    if (!id || isTogglingWishlist) return;

    setIsTogglingWishlist(true);
    const nextState = !isWishlisted;
    setIsWishlisted(nextState);

    try {
      const resp = await wishlistAPI.toggleWishlist(id);
      const serverState = resp?.inWishlist ?? nextState;
      setIsWishlisted(serverState);
      toast({
        title: serverState ? "Saved to Wishlist" : "Removed from Wishlist",
        description: serverState
          ? `Added "${experience?.title || "Experience"}" to your wishlist.`
          : `Removed "${experience?.title || "Experience"}" from your wishlist.`,
      });
    } catch (err: any) {
      setIsWishlisted(!nextState);
      toast({
        title: "Update failed",
        description:
          err.response?.data?.message || "Could not update wishlist.",
        variant: "destructive",
      });
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  // FIXED: handleBooking logic to prevent "Payment Initialization Failed"
  // UPDATED: handleBooking logic for Mock/Bypass Mode
  const handleBooking = async () => {
    if (!isAuthenticated) return navigate("/login");

    if (guideRequirement === "required" && !selectedGuideId) {
      toast({
        title: "Guide required",
        description: "Please select a certified local guide for this experience.",
        variant: "destructive",
      });
      return;
    }

    try {
      const experienceId = experience._id || id;
      const qty = Math.max(1, numGuests);

      const guideId =
        selectedGuideId && selectedGuideId !== "__none__"
          ? selectedGuideId
          : undefined;

      const resp = await bookingsAPI.create(experienceId, qty, guideId);
      
      // 2. Check if we are in Mock Mode (Bypassing Chapa)
      if (resp.status === 'success' && resp.mode === 'mock') {
        toast({ 
          title: "Booking Successful", 
          description: "Your spot has been reserved!",
        });
        
        // Go straight to the bookings page to see the result
        return navigate("/my-bookings");
      }

      // 3. Fallback for Chapa (if you decide to turn it back on later)
      const checkoutUrl = resp.checkout_url || resp.session?.url || resp.data?.checkout_url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Payment initialization failed.");
      }
    } catch (err: any) {
      console.error("Booking Detail:", err.response?.data || err);
      
      toast({ 
        title: "Booking Error", 
        description: err.response?.data?.message || "Failed to create booking", 
        variant: "destructive" 
      });
    }
  };

  const handleSubmitReview = async () => {
    if (!newRating) {
      toast({ title: "Rating Required", description: "Please select stars.", variant: "destructive" });
      return;
    }
    if (!newReview.trim()) {
      toast({ title: "Comment Required", description: "Please write a review.", variant: "destructive" });
      return;
    }

    setSubmittingReview(true);
    try {
      const experienceId = experience._id || id;
      await reviewsAPI.create({ 
        review: newReview, 
        rating: newRating,
        experience: experienceId!
      });

      toast({ title: "Success", description: "Thank you for your review!" });
      setReviewModalOpen(false);
      window.location.reload(); 
    } catch (err: any) {
      console.error("Review Error:", err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Failed to post review";
      toast({ title: "Error", description: errorMessage, variant: "destructive" });
    } finally {
      setSubmittingReview(false);
    }
  };

  if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!experience) return null;

  const maxAvailable = availability?.available ?? experience.maxGuests;
  const galleryImages =
    Array.isArray(experience.images) && experience.images.length > 0
      ? experience.images
      : [experience.imageCover].filter(Boolean);
  const exactLocation = String(experience.locationCoordinates || "").trim();
  const namedLocation = String(experience.location || "").trim();
  const mapLocation = exactLocation || namedLocation;
  const mapUrl = mapLocation
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapLocation)}`
    : "";
  const earthUrl = mapLocation
    ? `https://earth.google.com/web/search/${encodeURIComponent(mapLocation)}`
    : "";

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <Button asChild variant="ghost">
            <Link to="/experiences"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Tours</Link>
          </Button>
          <Button
            type="button"
            variant={isWishlisted ? "secondary" : "outline"}
            onClick={handleWishlistToggle}
            disabled={isTogglingWishlist}
            className="gap-2 shadow-sm"
          >
            <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`} />
            <span>{isWishlisted ? "Saved in Wishlist" : "Save to Wishlist"}</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h1 className="text-5xl font-extrabold mb-4">{experience.title}</h1>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center text-secondary">
                  <Star className="fill-current w-5 h-5 mr-1" />
                  <span className="font-bold text-lg">{experience.ratingsAverage}</span>
                </div>
                <Badge variant="outline" className="text-md px-4 py-1">{experience.duration}</Badge>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">{experience.description}</p>
            </section>

            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((img: string, i: number) => (
                <img key={i} src={resolveMediaUrl(img)} className="rounded-2xl h-64 w-full object-cover shadow-md" alt="Tour" />
              ))}
            </div>

            <div className="pt-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2"><MessageSquare /> Reviews</h3>
                {isAuthenticated && !hasUserReviewed && (
                  <Button onClick={() => setReviewModalOpen(true)}>Write Review</Button>
                )}
              </div>
              <div className="grid gap-4">
                {reviews.length > 0 ? reviews.map((r, i) => (
                  <Card key={i} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10"><AvatarFallback>{r.user?.name?.[0] || 'U'}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-bold">{r.user?.name || "Guest"}</p>
                          <div className="flex">{Array.from({length: 5}).map((_, idx) => <Star key={idx} className={`w-3 h-3 ${idx < r.rating ? "fill-secondary text-secondary" : "text-slate-200"}`} />)}</div>
                        </div>
                      </div>
                      <p className="text-slate-600 italic">"{r.review}"</p>
                    </CardContent>
                  </Card>
                )) : <p className="text-muted-foreground">No reviews yet for this experience.</p>}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden border-2 shadow-sm">
              <div className="bg-slate-100 h-64 flex items-center justify-center relative">
                {mapLocation ? (
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Experience Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                ) : (
                  <div className="text-center p-4">
                    <MapIcon className="mx-auto mb-2 text-slate-400" />
                    <p className="text-xs text-slate-500">Location map unavailable</p>
                  </div>
                )}
              </div>
              <CardContent className="p-4 bg-white border-t">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <MapIcon className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Meeting Point</p>
                      <p className="text-sm text-slate-600">{experience.location}</p>
                      {experience.locationCoordinates && (
                        <p className="text-xs text-slate-500">{experience.locationCoordinates}</p>
                      )}
                    </div>
                  </div>
                  {mapUrl && (
                    <div className="flex shrink-0 flex-col gap-2">
                      <Button asChild variant="outline" size="sm">
                        <a href={mapUrl} target="_blank" rel="noreferrer">
                          Open in Map
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href={earthUrl} target="_blank" rel="noreferrer">
                          Open in Earth
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="sticky top-28 border-2 shadow-xl overflow-hidden">
              <div className="bg-primary p-4 text-white text-center">
                <p className="text-sm opacity-90 uppercase tracking-widest font-semibold">Total Price</p>
                <h2 className="text-3xl font-black">ETB {experience.price * numGuests}</h2>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold"><span>Guests</span><span>{numGuests} Person(s)</span></div>
                  <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border">
                    <Button variant="ghost" size="icon" onClick={() => setNumGuests(Math.max(1, numGuests - 1))}><Minus className="h-4 w-4"/></Button>
                    <span className="text-lg font-bold">{numGuests}</span>
                    <Button variant="ghost" size="icon" onClick={() => setNumGuests(Math.min(maxAvailable, numGuests + 1))}><Plus className="h-4 w-4"/></Button>
                  </div>
                  <p className="text-xs text-center text-muted-foreground">{maxAvailable} spots left</p>
                </div>

                {guideRequirement !== "none" && (
                  <div className="space-y-2 border-t pt-4">
                    <p className="text-sm font-bold">
                      Certified local guide
                      {guideRequirement === "required" && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </p>
                    {availableGuides.length > 0 ? (
                      <Select
                        value={selectedGuideId || undefined}
                        onValueChange={setSelectedGuideId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your guide" />
                        </SelectTrigger>
                        <SelectContent>
                          {guideRequirement === "optional" && (
                            <SelectItem value="__none__">No guide preference</SelectItem>
                          )}
                          {availableGuides.map((g: any) => {
                            const gid = String(g._id || g.id);
                            return (
                              <SelectItem key={gid} value={gid}>
                                {g.name}
                                {g.location ? ` · ${g.location}` : ""}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {guideRequirement === "required"
                          ? "No certified guides are available yet. Check back soon."
                          : "Guides may be assigned after booking."}
                      </p>
                    )}
                  </div>
                )}

                {hasBooked ? (
                  <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg" disabled><Check className="mr-2" /> Booking Confirmed</Button>
                ) : (
                  <Button
                    className="w-full py-6 text-lg shadow-lg"
                    onClick={handleBooking}
                    disabled={
                      maxAvailable < 1 ||
                      (guideRequirement === "required" &&
                        (!selectedGuideId || selectedGuideId === "__none__"))
                    }
                  >
                    {maxAvailable < 1 ? "Fully Booked" : "Join Experience Now"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={reviewModalOpen} onOpenChange={setReviewModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Trip Feedback</DialogTitle>
            <DialogDescription>How was your visit to {experience?.title}?</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`w-8 h-8 cursor-pointer transition-all ${newRating >= star ? "fill-secondary text-secondary scale-110" : "text-slate-300"}`}
                />
              ))}
            </div>
            <Textarea 
              placeholder="What made this trip special?" 
              className="min-h-[120px] bg-slate-50"
              value={newReview} 
              onChange={(e) => setNewReview(e.target.value)} 
            />
            <Button className="w-full py-6 text-lg" onClick={handleSubmitReview} disabled={submittingReview}>
              {submittingReview ? <Loader2 className="animate-spin" /> : "Submit Review"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default TourDetail;
