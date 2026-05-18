import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { experiencesAPI, experienceGuidesAPI } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import { AlertCircle, CheckCircle2, Edit3, Link, Loader2, Plus, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const TourManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [experiences, setExperiences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    summary: "",
    price: "",
    duration: "",
    maxGuests: "",
    location: "",
    locationCoordinates: "",
    imageCover: "",
    guideRequirement: "optional" as "required" | "optional" | "none",
  });
  const [guideAppsOpen, setGuideAppsOpen] = useState(false);
  const [guideAppsExp, setGuideAppsExp] = useState<any>(null);
  const [guideApplications, setGuideApplications] = useState<any[]>([]);
  const [loadingGuideApps, setLoadingGuideApps] = useState(false);

  const fetchExperiences = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await experiencesAPI.getAll();
      
      setExperiences(response?.data?.data || []);
    } catch (err: any) {
      toast({ title: "Error", description: "Failed to load tours.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin" && (user as any).hostStatus !== "approved") {
      navigate("/");
      return;
    }
    fetchExperiences();
  }, [user, navigate, fetchExperiences]);

  const handleApproveTour = async (id: string) => {
    try {
      await experiencesAPI.approve(id);
      toast({ title: "Tour Approved", description: "This tour is now public." });
      fetchExperiences();
    } catch (err) {
      toast({ title: "Approval Failed", variant: "destructive" });
    }
  };

  const handleRejectTour = async (id: string) => {
    if (!window.confirm("Reject this tour?")) return;
    try {
      await experiencesAPI.update(id, { status: 'rejected' });
      toast({ title: "Tour Rejected" });
      fetchExperiences();
    } catch (err) {
      toast({ title: "Rejection Failed", variant: "destructive" });
    }
  };

  const handleEditClick = (exp: any) => {
    setEditingExperience(exp);
    setFormData({
      title: exp.title || "",
      description: exp.description || "",
      summary: exp.summary || "",
      price: exp.price?.toString() || "",
      duration: exp.duration || "",
      maxGuests: exp.maxGuests?.toString() || "",
      location: exp.location || "",
      locationCoordinates: exp.locationCoordinates || "",
      imageCover: exp.imageCover || "",
      guideRequirement: exp.guideRequirement || "optional",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleCreateClick = () => {
    setEditingExperience(null);
    setFormData({
      title: "",
      description: "",
      summary: "",
      price: "",
      duration: "",
      maxGuests: "",
      location: "",
      locationCoordinates: "",
      imageCover: "",
      guideRequirement: "optional",
    });
    setImageFile(null);
    setShowForm(true);
  };

  const openGuideApplications = async (exp: any) => {
    setGuideAppsExp(exp);
    setGuideAppsOpen(true);
    setLoadingGuideApps(true);
    try {
      const res = await experienceGuidesAPI.getApplicationsForExperience(exp._id);
      setGuideApplications(res.data?.applications || []);
    } catch {
      toast({ title: "Failed to load guide applications", variant: "destructive" });
      setGuideApplications([]);
    } finally {
      setLoadingGuideApps(false);
    }
  };

  const handleGuideAppAction = async (appId: string, action: "approve" | "reject") => {
    try {
      if (action === "approve") {
        await experienceGuidesAPI.approveApplication(appId);
        toast({ title: "Guide approved for this experience" });
      } else {
        await experienceGuidesAPI.rejectApplication(appId);
        toast({ title: "Application rejected" });
      }
      if (guideAppsExp) openGuideApplications(guideAppsExp);
      fetchExperiences();
    } catch (err: any) {
      toast({
        title: "Action failed",
        description: err.response?.data?.message || "Could not update application",
        variant: "destructive",
      });
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExperience(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageCover = formData.imageCover;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("imageCover", imageFile);
        const uploadResponse = await experiencesAPI.uploadImage(uploadData);
        imageCover = uploadResponse?.data?.imageCover || imageCover;
      }

      const payload = {
        ...formData,
        imageCover,
        price: Number(formData.price),
        maxGuests: Number(formData.maxGuests)
      };

      if (editingExperience) {
        await experiencesAPI.update(editingExperience._id, payload);
        toast({ title: "Updated Successfully" });
      } else {
        await experiencesAPI.create(payload);
        toast({
          title: user?.role === "admin" ? "Experience Created" : "Submitted",
          description: user?.role === "admin" ? "The experience is now live." : "Tour is pending admin approval."
        });
      }
      
      setShowForm(false);
      setEditingExperience(null);
      setImageFile(null);
      setFormData({
        title: "",
        description: "",
        summary: "",
        price: "",
        duration: "",
        maxGuests: "",
        location: "",
        locationCoordinates: "",
        imageCover: "",
        guideRequirement: "optional",
      });
      fetchExperiences();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Could not save tour.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this tour permanently?")) return;
    try {
      await experiencesAPI.delete(id);
      toast({ title: "Deleted" });
      fetchExperiences();
    } catch (error) {
      toast({ title: "Delete Failed", variant: "destructive" });
    }
  };

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) =>
      exp.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [experiences, searchTerm]);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navigation />
      <main className="flex-1 pt-24 container mx-auto px-4 pb-12">
        <PageHeader 
          title={user?.role === 'admin' ? "Admin: Experiences" : "My Tours"} 
          description={user?.role === 'admin' ? "Create, review, update, and delete experiences." : "Manage and review tour listings."} 
        />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Search experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-sm bg-white"
          />
          <Button onClick={handleCreateClick} variant="hero">
            <Plus className="h-4 w-4 mr-2" />
            New Experience
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8 border-primary/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">{editingExperience ? "Edit Tour" : "New Tour"}</h2>
                <Button variant="ghost" size="icon" onClick={handleCloseForm}><X /></Button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Tour Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                <Input placeholder="Location name, e.g. Hawassa, Bensa Daye" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
                <Input placeholder={`Exact coordinates optional, e.g. 6°30'03.23"N 38°44'41.67"E`} value={formData.locationCoordinates} onChange={e => setFormData({...formData, locationCoordinates: e.target.value})} />
                <Input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
                <Input placeholder="Duration" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required />
                <div className="relative">
                  <Input placeholder="Image URL (optional if uploading)" value={formData.imageCover} onChange={e => setFormData({...formData, imageCover: e.target.value})} required={!imageFile} className="pr-10" />
                  <Link className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                </div>
                <Input type="number" placeholder="Max Guests" value={formData.maxGuests} onChange={e => setFormData({...formData, maxGuests: e.target.value})} required />
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Guide requirement</label>
                  <Select
                    value={formData.guideRequirement}
                    onValueChange={(v: "required" | "optional" | "none") =>
                      setFormData({ ...formData, guideRequirement: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="required">Certified guide required</SelectItem>
                      <SelectItem value="optional">Guide optional</SelectItem>
                      <SelectItem value="none">No guide needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  {imageFile && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Selected local image: {imageFile.name}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Input placeholder="Brief Summary" value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="mb-4" required />
                  <Textarea placeholder="Full Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={4} required />
                </div>
                <Button type="submit" className="md:col-span-2 w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="animate-spin mr-2" /> : "Save Tour"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => (
            <Card key={exp._id} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="h-44 relative">
                <img src={resolveMediaUrl(exp.imageCover)} className="w-full h-full object-cover" alt={exp.title} />
                <Badge className="absolute top-2 right-2 uppercase text-[10px]" variant={exp.status === 'approved' ? 'default' : 'secondary'}>
                  {exp.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold truncate">{exp.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 capitalize">
                  Guide: {exp.guideRequirement || "optional"}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {exp.guideRequirement !== "none" && (user?.role === "admin" || (user as any)?.hostStatus === "approved") && (
                    <Button size="sm" variant="secondary" onClick={() => openGuideApplications(exp)}>
                      Guide applications
                    </Button>
                  )}
                  {user?.role === 'admin' && exp.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveTour(exp._id)}>
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleRejectTour(exp._id)}>
                        <AlertCircle className="h-3 w-3 mr-1" /> Reject
                      </Button>
                    </>
                  )}
                  {(user?.role !== 'admin' || exp.status !== 'pending') && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(exp)}><Edit3 className="h-3 w-3 mr-1" /> Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDelete(exp._id)}><Trash2 className="h-3 w-3" /></Button>
                    </>
                  )}
                  {user?.role === 'admin' && exp.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(exp)}><Edit3 className="h-3 w-3 mr-1" /> Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDelete(exp._id)}><Trash2 className="h-3 w-3" /></Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={guideAppsOpen} onOpenChange={setGuideAppsOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Guide applications — {guideAppsExp?.title}</DialogTitle>
          </DialogHeader>
          {loadingGuideApps ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : guideApplications.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4">No guide applications yet.</p>
          ) : (
            <div className="space-y-4">
              {guideApplications.map((app: any) => (
                <Card key={app._id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{app.guide?.name}</p>
                        <p className="text-xs text-muted-foreground">{app.guide?.email}</p>
                        {app.message && (
                          <p className="text-sm mt-2 text-muted-foreground">{app.message}</p>
                        )}
                      </div>
                      <Badge variant="outline">{app.status}</Badge>
                    </div>
                    {app.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleGuideAppAction(app._id, "approve")}>
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGuideAppAction(app._id, "reject")}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default TourManagement;
