import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { experiencesAPI, reviewsAPI, usersAPI } from "@/lib/api";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BarChart3,
  Loader2,
  MapPin,
  MessageSquare,
  Star,
  TrendingUp,
  UserCheck,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "Admin access required",
        variant: "destructive",
      });
      return;
    }

    const fetchStats = async () => {
      try {
        const [
          experiencesResponse,
          usersResponse,
          reviewsResponse,
          experienceStatsResponse,
          pendingResponse,
        ] = await Promise.all([
          experiencesAPI.getAll(),
          usersAPI.getAll(),
          reviewsAPI.getAll(),
          experiencesAPI.getExperienceStats(),
          experiencesAPI.getPending(),
        ]);

        const experiences = experiencesResponse.data?.data || [];
        const pendingExperiences = pendingResponse?.data?.data || [];
        const users = usersResponse.data?.data || [];
        const reviews = reviewsResponse.data?.data || [];
        const experienceStats = experienceStatsResponse?.data?.data;

        // Calculate stats
        const totalRevenue = experiences.reduce(
          (sum: number, exp: any) => sum + (exp.price || 0) * (exp.ratingsQuantity || 0),
          0
        );
        
        const averageRating = experiences.length > 0
          ? experiences.reduce((sum: number, exp: any) => sum + (exp.ratingsAverage || 0), 0) / experiences.length
          : 0;

        const activeUsers = users.filter((u: any) => u.active !== false).length;

        setStats({
          totalExperiences: experiences.length,
          totalUsers: users.length,
          activeUsers,
          totalReviews: reviews.length,
          totalRevenue,
          averageRating,
          experienceStats,
          recentReviews: reviews.slice(0, 5),
          experiences: experiences.slice(0, 5),
          pendingExperiencesCount: pendingExperiences.length,
        });
      } catch (err: any) {
        console.error("Dashboard Fetch Error:", err);
        setError("Failed to load dashboard statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate, toast]);

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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <Card className="border-destructive">
            <CardContent className="p-6 flex items-center gap-3 text-destructive">
              <AlertCircle />
              <p>{error}</p>
            </CardContent>
          </Card>
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
          title={<><BarChart3 className="w-10 h-10 inline mr-3 text-primary" /> Admin Dashboard</>}
          description={`Welcome back, ${user?.name}!`}
        />

        <section className="py-12 container mx-auto px-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Experiences</p>
                  <p className="text-3xl font-bold">{stats.totalExperiences}</p>
                </div>
                <MapPin className="text-primary" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="text-primary" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Reviews</p>
                  <p className="text-3xl font-bold">{stats.totalReviews}</p>
                </div>
                <MessageSquare className="text-primary" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-3xl font-bold">{stats.averageRating.toFixed(1)}</p>
                </div>
                <Star className="text-primary fill-primary" />
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
             <Button variant="outline" onClick={() => navigate("/admin/experiences")}>Experiences</Button>
             <Button variant="outline" onClick={() => navigate("/admin/users")}>Users</Button>
             <Button variant="outline" onClick={() => navigate("/admin/hosts")}>Hosts</Button>
             <Button variant="outline" onClick={() => navigate("/admin/host-applications")}>Host Apps</Button>
             <Button variant="outline" onClick={() => navigate("/admin/guide-applications")}>Guide Apps</Button>
             <Button variant="outline" onClick={() => navigate("/admin/guide-management")}>Guides</Button>
             <Button variant="outline" onClick={() => navigate("/my-reviews")}>Reviews</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader><CardTitle>Recent Experiences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {stats.experiences.map((exp: any) => (
                  <div key={exp.id} className="flex justify-between p-3 border rounded">
                    <span>{exp.title}</span>
                    <span className="font-bold">ETB {exp.price}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Recent Reviews</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {stats.recentReviews.map((rev: any) => (
                  <div key={rev.id} className="p-3 border rounded">
                    <p className="font-bold">{rev.user?.name || "Anonymous"}</p>
                    <p className="text-sm text-muted-foreground italic">"{rev.review}"</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;