import axios from "axios";

// ================================================
// CONFIGURATION
// ================================================

export const API_BASE_URL = "/api/v1";
export const API_ORIGIN = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ================================================
// Auth API
// ================================================
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post("/users/login", { email, password });
    return response.data;
  },
  signup: async (name: string, email: string, password: string, passwordConfirm: string) => {
    const response = await api.post("/users/signup", { name, email, password, passwordConfirm });
    return response.data;
  },
  verifyEmail: async (token: string) => {
    const response = await api.get(`/users/verifyEmail/${token}`);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

// ================================================
// Experiences API (URL-BASED)
// ================================================
export const experiencesAPI = {
  getAll: async (paramsObj?: Record<string, any>) => {
    const response = await api.get("/experiences", { params: paramsObj });
    return response.data;
  },
  getPending: async () => {
    const response = await api.get("/experiences/pending");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },
  getExperienceStats: async () => {
    const response = await api.get("/experiences/experience-stats");
    return response.data;
  },
  create: async (experienceData: any) => {
    const response = await api.post("/experiences", experienceData);
    return response.data;
  },
  uploadImage: async (formData: FormData) => {
    const response = await api.post("/experiences/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.patch(`/experiences/${id}`, data);
    return response.data;
  },
  approve: async (id: string) => {
    const response = await api.patch(`/experiences/${id}/approve`);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/experiences/${id}`);
    return response.data;
  },
  getTopCheap: async () => {
    const response = await api.get("/experiences/top-5-cheap");
    return response.data;
  },
};

// ================================================
// Host & Guide Application APIs
// ================================================
export const hostApplicationAPI = {
  createOrUpdate: async (personalInfo: any) => {
    const response = await api.post("/host-applications", { personalInfo });
    return response.data;
  },
  updateExperienceDetails: async (experienceDetails: any) => {
    const response = await api.patch("/host-applications/experience-details", { experienceDetails });
    return response.data;
  },
  updateMedia: async (media: any) => {
    const response = await api.patch("/host-applications/media", { media });
    return response.data;
  },
  uploadMedia: async (formData: FormData) => {
    const response = await api.post("/host-applications/upload-media", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  submitApplication: async () => {
    const response = await api.post("/host-applications/submit");
    return response.data;
  },
  reapplyApplication: async () => {
    const response = await api.post("/host-applications/reapply");
    return response.data;
  },
  getMyApplication: async () => {
    const response = await api.get("/host-applications/my-application");
    return response.data;
  },
  getPendingApplications: async () => {
    const response = await api.get("/host-applications/pending");
    return response.data;
  },
  approveApplication: async (id: string, guideId?: string) => {
    const response = await api.patch(`/host-applications/${id}/approve`, { guideId });
    return response.data;
  },
  rejectApplication: async (id: string, rejectionReason?: string) => {
    const response = await api.patch(`/host-applications/${id}/reject`, { rejectionReason });
    return response.data;
  },
};

export const guideApplicationAPI = {
  createOrUpdate: async (personalInfo: any) => {
    const response = await api.post("/guide-applications", { personalInfo });
    return response.data;
  },
  updateExperienceDetails: async (experienceDetails: any) => {
    const response = await api.patch("/guide-applications/experience-details", { experienceDetails });
    return response.data;
  },
  updateMedia: async (media: any) => {
    const response = await api.patch("/guide-applications/media", { media });
    return response.data;
  },
  uploadMedia: async (formData: FormData) => {
    const response = await api.post("/guide-applications/upload-media", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  submitApplication: async () => {
    const response = await api.post("/guide-applications/submit");
    return response.data;
  },
  reapplyApplication: async () => {
    const response = await api.post("/guide-applications/reapply");
    return response.data;
  },
  getMyApplication: async () => {
    const response = await api.get("/guide-applications/my-application");
    return response.data;
  },
  getPendingApplications: async () => {
    const response = await api.get("/guide-applications/pending");
    return response.data;
  },
  approveApplication: async (id: string) => {
    const response = await api.patch(`/guide-applications/${id}/approve`);
    return response.data;
  },
};

// ================================================
// Guides & Host Assignments
// ================================================
export const guidesAPI = {
  getAll: async (location?: string) => {
    const response = await api.get("/users/guides", { params: { location } });
    return response.data;
  },
  getAssignedHosts: async (guideId: string) => {
    const response = await api.get(`/users/guides/${guideId}/hosts`);
    return response.data;
  },
  assignToHost: async (hostId: string, guideId: string) => {
    const response = await api.patch(`/users/hosts/${hostId}/assign-guide`, { guideId });
    return response.data;
  },
  reassignToHost: async (hostId: string, guideId: string) => {
    const response = await api.patch(`/users/hosts/${hostId}/reassign-guide`, { guideId });
    return response.data;
  },
};

// ================================================
// Users & Management
// ================================================
export const usersAPI = {
  getAll: async (filters?: { role?: string }) => {
    const response = await api.get("/users", { params: filters });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },
  updateMe: async (data: any) => {
    const response = await api.patch("/users/updateMe", data);
    return response.data;
  },
  updateMyPassword: async (passwordCurrent: string, password: string, passwordConfirm: string) => {
    const response = await api.patch("/users/updateMyPassword", {
      passwordCurrent,
      password,
      passwordConfirm,
    });
    return response.data;
  },
  approveHost: async (id: string) => {
    const response = await api.patch(`/users/approve-host/${id}`);
    return response.data;
  },
  rejectHost: async (id: string) => {
    const response = await api.patch(`/users/reject-host/${id}`);
    return response.data;
  },
};

// ================================================
// Wishlist API
// ================================================
export const wishlistAPI = {
  getWishlist: async () => {
    const response = await api.get("/users/wishlist");
    return response.data;
  },
  addToWishlist: async (experienceId: string) => {
    const response = await api.post(`/users/wishlist/${experienceId}`);
    return response.data;
  },
  removeFromWishlist: async (experienceId: string) => {
    const response = await api.delete(`/users/wishlist/${experienceId}`);
    return response.data;
  },
  toggleWishlist: async (experienceId: string) => {
    const response = await api.post(`/users/wishlist/toggle/${experienceId}`);
    return response.data;
  },
};



// ================================================
// Reviews & Bookings
// ================================================
export const reviewsAPI = {
  getAll: async (paramsObj?: Record<string, any>) => {
    const response = await api.get("/reviews", { params: paramsObj });
    return response.data;
  },
  // Correctly fetches reviews for a specific experience
  getByExperience: async (experienceId: string) => {
    const response = await api.get(`/experiences/${experienceId}/reviews`);
    return response.data;
  },
  // Expects { review, rating, experience }
  create: async (reviewData: { review: string; rating: number; experience: string }) => {
    const response = await api.post("/reviews", reviewData);
    return response.data;
  },
};

export const bookingsAPI = {
  create: async (experienceId: string, qty?: number, guideId?: string) => {
    const response = await api.get(`/bookings/checkout-session/${experienceId}`, {
      params: { qty, guideId: guideId || undefined },
    });
    return response.data;
  },
  getMyBookings: async () => {
    const response = await api.get("/bookings/me");
    return response.data;
  },
  getGuideBookings: async () => {
    const response = await api.get("/bookings/guide/bookings");
    return response.data;
  },
  confirmGuideAvailability: async (bookingId: string) => {
    const response = await api.patch(`/bookings/${bookingId}/guide/confirm-availability`);
    return response.data;
  },
  completeGuideService: async (bookingId: string) => {
    const response = await api.patch(`/bookings/${bookingId}/guide/complete`);
    return response.data;
  },
  getAvailability: async (experienceId: string) => {
    const response = await api.get(`/bookings/availability/${experienceId}`);
    return response.data;
  },
};

export const experienceGuidesAPI = {
  getOpenExperiences: async () => {
    const response = await api.get("/experience-guides/open-experiences");
    return response.data;
  },
  getMyApplications: async () => {
    const response = await api.get("/experience-guides/my-applications");
    return response.data;
  },
  applyToExperience: async (experienceId: string, message?: string) => {
    const response = await api.post(`/experience-guides/experience/${experienceId}/apply`, { message });
    return response.data;
  },
  getApplicationsForExperience: async (experienceId: string) => {
    const response = await api.get(`/experience-guides/experience/${experienceId}/applications`);
    return response.data;
  },
  getSelectableGuides: async (experienceId: string) => {
    const response = await api.get(`/experience-guides/experience/${experienceId}/selectable-guides`);
    return response.data;
  },
  approveApplication: async (applicationId: string) => {
    const response = await api.patch(`/experience-guides/${applicationId}/approve`);
    return response.data;
  },
  rejectApplication: async (applicationId: string, rejectionReason?: string) => {
    const response = await api.patch(`/experience-guides/${applicationId}/reject`, { rejectionReason });
    return response.data;
  },
};

export const messagesAPI = {
  send: async (data: {
    recipientId: string;
    content: string;
    bookingId?: string;
    experienceId?: string;
  }) => {
    const response = await api.post("/messages", data);
    return response.data;
  },
  getConversation: async (userId: string, bookingId?: string) => {
    const response = await api.get(`/messages/conversation/${userId}`, {
      params: bookingId ? { bookingId } : undefined,
    });
    return response.data;
  },
  getInbox: async () => {
    const response = await api.get("/messages/inbox");
    return response.data;
  },
};

// ================================================
// Wallet & Withdrawals (RESTORED)
// ================================================
export const walletAPI = {
  getMy: async () => {
    // Changed from "/wallets/me" to "/" because the router 
    // is already mounted at "/api/v1/wallets"
    const response = await api.get("/wallets"); 
    return response.data;
  },
  getWithdrawals: async () => {
    // Ensure this matches your withdrawal routes mounting in app.js
    const response = await api.get("/withdrawals");
    return response.data;
  },
};

export const withdrawalsAPI = {
  create: async (data: { amountCents: number; clientRequestId?: string }) => {
    const response = await api.post("/withdrawals", data);
    return response.data;
  },
  listMine: async (params?: { page?: number; limit?: number }) => {
    const response = await api.get("/withdrawals", { params });
    return response.data;
  },
  requestWithdrawal: async (data: { amount: number; paymentMethod: string; accountDetails: string }) => {
    const response = await api.post("/withdrawals", data);
    return response.data;
  },
  getAllWithdrawals: async () => {
    const response = await api.get("/withdrawals");
    return response.data;
  },
  updateWithdrawalStatus: async (id: string, status: string) => {
    const response = await api.patch(`/withdrawals/${id}`, { status });
    return response.data;
  },
};

// ================================================
// Admin Payouts (RESTORED)
// ================================================
export const adminPayoutsAPI = {
  createExport: async () => {
    const response = await api.post("/admin/payouts/exports");
    return response.data;
  },
  listWithdrawals: async (status?: string) => {
    const response = await api.get("/admin/payouts/withdrawals", { params: { status } });
    return response.data;
  },
  markPaid: async (id: string) => {
    const response = await api.post(`/admin/payouts/withdrawals/${id}/mark-paid`);
    return response.data;
  },
  markFailed: async (id: string, reason?: string) => {
    const response = await api.post(`/admin/payouts/withdrawals/${id}/mark-failed`, { reason });
    return response.data;
  },
  getAll: async () => {
    const response = await api.get("/withdrawals");
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/withdrawals/${id}`, { status });
    return response.data;
  },
};

// ================================================
// Notifications
// ================================================
export const notificationsAPI = {
  getMine: async (limit = 10) => {
    const response = await api.get("/notifications", { params: { limit } });
    return response.data;
  },
  markRead: async (id: string) => {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  },
  markAllRead: async () => {
    const response = await api.patch("/notifications/read-all");
    return response.data;
  },
};

// ================================================
// Dashboard Statistics (RESTORED)
// ================================================
export const statisticsAPI = {
  getStats: async () => {
    const response = await api.get("/experiences/stats");
    return response.data;
  },
  getAdminStats: async () => {
    const response = await api.get("/users/admin-stats");
    return response.data;
  },
  getHostStats: async () => {
    const response = await api.get("/users/host-stats");
    return response.data;
  }
};

export const toursAPI = experiencesAPI;
export default api;
