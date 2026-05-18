import { authAPI } from "@/lib/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<void>;
  updateUser: (newUser: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    console.log("🔄 [AuthContext] login() called with email:", email);

    try {
      console.log("📡 [AuthContext] Calling authAPI.login()...");
      
      const response = await authAPI.login(email, password);
      
      console.log("✅ [AuthContext] authAPI.login() succeeded:", response);

      const { token: authToken, data } = response;

      setToken(authToken);
      setUser(data.user);

      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("✅ [AuthContext] User logged in successfully");
    } catch (error: any) {
      console.error("❌ [AuthContext] Login error caught:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        code: error.code,
        fullError: error
      });

      const isNetworkIssue =
        error.code === 'ECONNREFUSED' ||
        error.code === 'ERR_NETWORK' ||
        error.code === 'ECONNABORTED' ||
        error.message?.includes('Network Error') ||
        error.message?.toLowerCase?.().includes('timeout');

      if (isNetworkIssue) {
        throw new Error("Cannot connect to server. Please check if the backend is running.");
      }
      const message = error.response?.data?.message || error.message || "Login failed";
      throw new Error(message);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      // Signup endpoint will create user and send verification email.
      // Do not auto-login; frontend will wait for verification.
      await authAPI.signup(name, email, password, passwordConfirm);
    } catch (error: any) {
      // Better error messages
      if (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error') || !error.response) {
        throw new Error("Cannot connect to server. Please check if the backend is running and accessible.");
      }
      const message = error.response?.data?.message || error.message || "Signup failed";
      throw new Error(message);
    }
  };

  const updateUser = (newUser: User) => {
    setUser(newUser);
    try {
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (err) {
      // ignore
    }
  };

  const logout = () => {
    authAPI.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        updateUser,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
