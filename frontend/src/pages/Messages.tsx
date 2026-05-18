import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { messagesAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare } from "lucide-react";

export default function Messages() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const withUserId = searchParams.get("with") || "";

  const [threads, setThreads] = useState<any[]>([]);
  const [activeUser, setActiveUser] = useState<any>(null);
  const [conversation, setConversation] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadInbox = async () => {
    try {
      const res = await messagesAPI.getInbox();
      setThreads(res.data?.threads || []);
    } catch {
      setThreads([]);
    }
  };

  const openChat = async (user: any) => {
    if (!user) return;
    setActiveUser(user);
    navigate(`/messages?with=${user._id || user.id}`, { replace: true });
    try {
      const res = await messagesAPI.getConversation(String(user._id || user.id));
      setConversation(res.data?.messages || []);
    } catch (err: any) {
      setConversation([]);
      toast({
        title: "Could not load conversation",
        description: err.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const init = async () => {
      setLoading(true);
      try {
        const inboxRes = await messagesAPI.getInbox();
        const inboxThreads = inboxRes.data?.threads || [];
        setThreads(inboxThreads);

        if (withUserId) {
          const thread = inboxThreads.find(
            (t: any) => String(t.user?._id || t.user?.id) === withUserId
          );
          setActiveUser(thread?.user || { _id: withUserId, name: "User" });

          const res = await messagesAPI.getConversation(withUserId);
          setConversation(res.data?.messages || []);
        }
      } catch {
        if (withUserId) {
          setActiveUser({ _id: withUserId, name: "User" });
        }
      }
      setLoading(false);
    };

    init();
  }, [isAuthenticated, navigate, withUserId, toast]);

  const handleSend = async () => {
    if (!activeUser || !newMessage.trim()) return;
    setSending(true);
    try {
      await messagesAPI.send({
        recipientId: String(activeUser._id || activeUser.id),
        content: newMessage.trim(),
      });
      setNewMessage("");
      await openChat(activeUser);
      await loadInbox();
    } catch (err: any) {
      toast({
        title: "Failed to send",
        description: err.response?.data?.message || "Could not send message",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
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
              <MessageSquare className="w-8 h-8 inline mr-2 text-primary" />
              Messages
            </>
          }
          description="Communicate with hosts, guides, and visitors"
        />
        <section className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Conversations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {threads.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No conversations yet.</p>
                ) : (
                  threads.map((t: any) => (
                    <Button
                      key={t.user?._id || t.user?.id}
                      variant="outline"
                      className="w-full justify-start h-auto py-2"
                      onClick={() => openChat(t.user)}
                    >
                      <span className="text-left">
                        <span className="block font-medium">{t.user?.name}</span>
                        <span className="block text-xs text-muted-foreground truncate">
                          {t.lastMessage?.content}
                        </span>
                      </span>
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  {activeUser ? `Chat with ${activeUser.name || "User"}` : "Select a conversation"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-2 bg-muted/20">
                  {conversation.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No messages yet.</p>
                  ) : (
                    conversation.map((m: any) => (
                      <p key={m._id} className="text-sm bg-white border rounded p-2">
                        <strong>{m.sender?.name}: </strong>
                        {m.content}
                      </p>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={!activeUser}
                  />
                  <Button onClick={handleSend} disabled={sending || !activeUser}>
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
