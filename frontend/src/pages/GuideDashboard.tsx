import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Loader2,
  Mail,
  Phone,
  User,
  Briefcase,
  MessageSquare,
  CalendarCheck,
  CheckCircle,
} from "lucide-react";
import {
  guidesAPI,
  experiencesAPI,
  experienceGuidesAPI,
  bookingsAPI,
  messagesAPI,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function GuideDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [hosts, setHosts] = useState<any[]>([]);
  const [hostExperiences, setHostExperiences] = useState<Record<string, any[]>>({});
  const [openExperiences, setOpenExperiences] = useState<any[]>([]);
  const [guideBookings, setGuideBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [messageTarget, setMessageTarget] = useState<any>(null);
  const [messageBookingId, setMessageBookingId] = useState<string>("");
  const [conversation, setConversation] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");

  const loadDashboard = useCallback(async () => {
    const guideId = (user as any)?._id || user?.id;
    if (!guideId) return;

    try {
      setIsLoading(true);
      const [hostsRes, openRes, bookingsRes] = await Promise.all([
        guidesAPI.getAssignedHosts(guideId),
        experienceGuidesAPI.getOpenExperiences(),
        bookingsAPI.getGuideBookings(),
      ]);

      const hostsData = hostsRes.data?.hosts || [];
      setHosts(hostsData);
      setOpenExperiences(openRes.data?.experiences || []);
      setGuideBookings(bookingsRes.data?.bookings || []);

      const experiencesMap: Record<string, any[]> = {};
      for (const host of hostsData) {
        const hostId = host._id || host.id;
        try {
          const expResponse = await experiencesAPI.getAll({ host: hostId });
          experiencesMap[hostId] = expResponse.data?.data || [];
        } catch {
          experiencesMap[hostId] = [];
        }
      }
      setHostExperiences(experiencesMap);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load guide dashboard",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if ((user as any)?.guideStatus !== "approved") {
      navigate("/profile");
      toast({
        title: "Access Denied",
        description: "You must be an approved guide to access this page.",
        variant: "destructive",
      });
      return;
    }
    loadDashboard();
  }, [user, isAuthenticated, navigate, toast, loadDashboard]);

  useEffect(() => {
    const messageUserId = searchParams.get("message");
    if (messageUserId && isAuthenticated) {
      navigate(`/messages?with=${messageUserId}`);
    }
  }, [searchParams, isAuthenticated, navigate]);

  const openMessagePanel = async (target: any, bookingId?: string) => {
    setMessageTarget(target);
    setMessageBookingId(bookingId || "");
    try {
      const res = await messagesAPI.getConversation(
        String(target._id || target.id),
        bookingId
      );
      setConversation(res.data?.messages || []);
    } catch {
      setConversation([]);
    }
  };

  const handleSendMessage = async () => {
    if (!messageTarget || !newMessage.trim()) return;
    setSendingMessage(true);
    try {
      await messagesAPI.send({
        recipientId: String(messageTarget._id || messageTarget.id),
        content: newMessage.trim(),
        bookingId: messageBookingId || undefined,
      });
      setNewMessage("");
      openMessagePanel(messageTarget, messageBookingId || undefined);
      toast({ title: "Message sent" });
    } catch (err: any) {
      toast({
        title: "Failed to send",
        description: err.response?.data?.message || "Could not send message",
        variant: "destructive",
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const handleApply = async (experienceId: string) => {
    try {
      await experienceGuidesAPI.applyToExperience(experienceId, applyMessage);
      toast({ title: "Application submitted", description: "The host will review your request." });
      setApplyMessage("");
      loadDashboard();
    } catch (err: any) {
      toast({
        title: "Application failed",
        description: err.response?.data?.message || "Could not apply",
        variant: "destructive",
      });
    }
  };

  const handleConfirmAvailability = async (bookingId: string) => {
    try {
      await bookingsAPI.confirmGuideAvailability(bookingId);
      toast({ title: "Availability confirmed" });
      loadDashboard();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Could not confirm",
        variant: "destructive",
      });
    }
  };

  const handleCompleteService = async (bookingId: string) => {
    try {
      await bookingsAPI.completeGuideService(bookingId);
      toast({ title: "Service marked complete" });
      loadDashboard();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Could not complete",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        <PageHeader
          title={
            <>
              <User className="w-10 h-10 inline-block mr-3 text-primary" />
              Guide Dashboard
            </>
          }
          description="Connect visitors, hosts, and cultural experiences"
        />

        <section className="py-8 container mx-auto px-4">
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-1">
              <TabsTrigger value="bookings">Visitor bookings</TabsTrigger>
              <TabsTrigger value="experiences">Browse experiences</TabsTrigger>
              <TabsTrigger value="hosts">Community hosts</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              {guideBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No visitor bookings assigned to you yet.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {guideBookings.map((booking: any) => (
                    <Card key={booking._id}>
                      <CardContent className="p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold">{booking.experience?.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Visitor: {booking.user?.name} · {booking.user?.email}
                            </p>
                            <p className="text-sm">
                              {booking.quantity} guest(s) · ETB {booking.price}
                            </p>
                          </div>
                          <Badge variant="outline">{booking.guideServiceStatus}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openMessagePanel(booking.user, booking._id)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message visitor
                          </Button>
                          {booking.experience?.host && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const host = booking.experience.host;
                                const hostId =
                                  typeof host === "object"
                                    ? host._id || host.id
                                    : host;
                                navigate(`/messages?with=${hostId}`);
                              }}
                            >
                              Message host
                            </Button>
                          )}
                          {booking.guideServiceStatus === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleConfirmAvailability(booking._id)}
                            >
                              <CalendarCheck className="w-4 h-4 mr-1" />
                              Confirm availability
                            </Button>
                          )}
                          {booking.guideServiceStatus !== "completed" && (
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleCompleteService(booking._id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Mark complete
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="experiences">
              <div className="mb-4">
                <Textarea
                  placeholder="Optional note when applying to an experience..."
                  value={applyMessage}
                  onChange={(e) => setApplyMessage(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {openExperiences.map((exp: any) => (
                  <Card key={exp._id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Host: {exp.host?.name} · {exp.location}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Badge variant="outline" className="capitalize">
                        Guide {exp.guideRequirement}
                      </Badge>
                      <div className="flex flex-wrap gap-2">
                        {exp.host && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              navigate(
                                `/messages?with=${exp.host._id || exp.host.id || exp.host}`
                              )
                            }
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message host
                          </Button>
                        )}
                        {exp.myApplicationStatus ? (
                          <Badge className="capitalize">{exp.myApplicationStatus}</Badge>
                        ) : (
                          <Button size="sm" onClick={() => handleApply(exp._id)}>
                            Apply to guide this experience
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hosts">
              {hosts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <p>No hosts assigned yet. Apply to experiences to build connections.</p>
                  </CardContent>
                </Card>
              ) : (
                hosts.map((host) => {
                  const hostId = host._id || host.id;
                  const experiences = hostExperiences[hostId] || [];
                  return (
                    <Card key={hostId} className="mb-4">
                      <CardHeader>
                        <CardTitle>{host.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" /> {host.email}
                          </span>
                          {host.hostApplicationData?.phoneNumber && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {host.hostApplicationData.phoneNumber}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            navigate(`/messages?with=${host._id || host.id}`)
                          }
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message host
                        </Button>
                        {experiences.length > 0 && (
                          <div>
                            <p className="font-semibold text-sm mb-2 flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              Experiences ({experiences.length})
                            </p>
                            <div className="grid gap-2 md:grid-cols-2">
                              {experiences.map((exp: any) => (
                                <div
                                  key={exp._id}
                                  className="p-3 rounded-lg bg-muted/50 text-sm"
                                >
                                  <p className="font-medium">{exp.title}</p>
                                  <p className="text-muted-foreground">{exp.location}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </TabsContent>

            <TabsContent value="messages">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Start a conversation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Select from your bookings or hosts to message.
                    </p>
                    {guideBookings.map((b: any) => (
                      <Button
                        key={`v-${b._id}`}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => openMessagePanel(b.user, b._id)}
                      >
                        Visitor: {b.user?.name} — {b.experience?.title}
                      </Button>
                    ))}
                    {hosts.map((h: any) => (
                      <Button
                        key={`h-${h._id}`}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => openMessagePanel(h)}
                      >
                        Host: {h.name}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {messageTarget
                        ? `Chat with ${messageTarget.name || "User"}`
                        : "Select someone to message"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-48 overflow-y-auto border rounded-lg p-3 space-y-2 bg-muted/30">
                      {conversation.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No messages yet.</p>
                      ) : (
                        conversation.map((m: any) => {
                          const isMine =
                            String(m.sender?._id || m.sender) ===
                            String((user as any)?._id || user?.id);
                          return (
                            <div
                              key={m._id}
                              className={`text-sm p-2 rounded-lg max-w-[85%] ${
                                isMine
                                  ? "ml-auto bg-primary text-primary-foreground"
                                  : "bg-white border"
                              }`}
                            >
                              {m.content}
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} disabled={sendingMessage}>
                        Send
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
}
