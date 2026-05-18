import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { bookingsAPI, messagesAPI } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import { Loader2, MapPin, MessageSquare, Ticket, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageTarget, setMessageTarget] = useState<any>(null);
  const [messageBookingId, setMessageBookingId] = useState("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await bookingsAPI.getMyBookings();
        // Extract data based on your specific API response structure
        const fetchedData = res.data?.data?.data || res.data?.data || res.data || [];
        setBookings(fetchedData);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  const openGuideChat = async (guide: any, bookingId: string) => {
    setMessageTarget(guide);
    setMessageBookingId(bookingId);
    setMessageOpen(true);
    try {
      const res = await messagesAPI.getConversation(String(guide._id || guide.id), bookingId);
      setConversation(res.data?.messages || []);
    } catch {
      setConversation([]);
    }
  };

  const sendMessage = async () => {
    if (!messageTarget || !newMessage.trim()) return;
    setSending(true);
    try {
      await messagesAPI.send({
        recipientId: String(messageTarget._id || messageTarget.id),
        content: newMessage.trim(),
        bookingId: messageBookingId,
      });
      setNewMessage("");
      openGuideChat(messageTarget, messageBookingId);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="flex justify-between items-end mb-8">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <Badge variant="secondary">{bookings.length} Bookings</Badge>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border">
            <Ticket className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <p className="text-slate-500">You haven't booked any experiences yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => {
              const exp = booking.experience;
              if (!exp) return null;

              const rawImg = exp.imageCover || (exp.images && exp.images[0]);
              const imageSrc = resolveMediaUrl(rawImg, "/placeholder-image.jpg");

              return (
                <Card key={booking._id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="h-48 w-full relative bg-slate-200">
                    <img
                      src={imageSrc}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Not+Available";
                      }}
                    />
                    <Badge className="absolute top-4 right-4 bg-green-600 shadow-sm border-none">
                      Paid
                    </Badge>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold line-clamp-1 text-slate-800">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-slate-500 text-sm mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-primary/70" />
                        {exp.location || "Location TBD"}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <div className="text-sm">
                        <p className="text-slate-400 uppercase text-[10px] font-semibold tracking-wider">Guests</p>
                        <p className="font-bold text-slate-700">{booking.quantity} Person(s)</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 uppercase text-[10px] font-semibold tracking-wider">Total Price</p>
                        <p className="font-bold text-primary">ETB {booking.price?.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {booking.guide && (
                      <div className="flex items-center gap-2 text-sm border-t pt-3">
                        <User className="h-4 w-4 text-primary" />
                        <span>
                          Guide: <strong>{booking.guide.name}</strong>
                          {booking.guide.location ? ` · ${booking.guide.location}` : ""}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {booking.guide && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openGuideChat(booking.guide, booking._id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message guide
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigate(`/experiences/${exp._id || exp}`)}
                      >
                        View experience
                      </Button>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-[9px] text-slate-300 font-mono italic">ID: {booking._id?.slice(-8)}</span>
                        <p className="text-[10px] text-slate-400 font-mono uppercase bg-slate-100 px-2 py-0.5 rounded">
                            REF: {booking.txRef || 'ETX-MOCK'}
                        </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message {messageTarget?.name || "your guide"}</DialogTitle>
          </DialogHeader>
          <div className="h-40 overflow-y-auto border rounded p-2 space-y-2 mb-3">
            {conversation.map((m: any) => (
              <p key={m._id} className="text-sm bg-muted/50 p-2 rounded">
                {m.content}
              </p>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write a message..."
            />
            <Button onClick={sendMessage} disabled={sending}>
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default MyBookings;
