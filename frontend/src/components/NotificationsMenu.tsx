import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notificationsAPI } from "@/lib/api";
import { cn } from "@/lib/utils";

type Notification = {
  _id: string;
  title: string;
  message: string;
  link?: string;
  readAt?: string | null;
  createdAt?: string;
};

type NotificationsMenuProps = {
  className?: string;
  mobile?: boolean;
};

const formatNotificationTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "Now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const NotificationsMenu = ({ className, mobile = false }: NotificationsMenuProps) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await notificationsAPI.getMine(10);
      setNotifications(response?.data?.notifications || []);
      setUnreadCount(response?.unreadCount || 0);
    } catch (error) {
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = window.setInterval(fetchNotifications, 60000);
    return () => window.clearInterval(interval);
  }, []);

  const markAllRead = async () => {
    await notificationsAPI.markAllRead();
    setNotifications(current =>
      current.map(notification => ({
        ...notification,
        readAt: notification.readAt || new Date().toISOString(),
      }))
    );
    setUnreadCount(0);
  };

  const openNotification = async (notification: Notification) => {
    if (!notification.readAt) {
      await notificationsAPI.markRead(notification._id);
      setUnreadCount(current => Math.max(0, current - 1));
      setNotifications(current =>
        current.map(item =>
          item._id === notification._id
            ? { ...item, readAt: new Date().toISOString() }
            : item
        )
      );
    }

    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && fetchNotifications()}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={mobile ? "outline" : "ghost"}
          size={mobile ? "sm" : "icon"}
          className={cn("relative", mobile && "w-full", className)}
          aria-label="Notifications"
        >
          <Bell className={cn("w-4 h-4", mobile && "mr-2")} />
          {mobile && "Notifications"}
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={markAllRead}
            >
              <Check className="mr-1 h-3 w-3" />
              Read all
            </Button>
          )}
        </div>
        <DropdownMenuSeparator className="m-0" />
        <div className="max-h-96 overflow-y-auto p-1">
          {isLoading && notifications.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No notifications yet.
            </p>
          ) : (
            notifications.map(notification => (
              <DropdownMenuItem
                key={notification._id}
                className="items-start gap-3 p-3"
                onClick={() => openNotification(notification)}
              >
                <span
                  className={cn(
                    "mt-1 h-2 w-2 shrink-0 rounded-full",
                    notification.readAt ? "bg-muted" : "bg-primary"
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">
                    {notification.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {notification.message}
                  </span>
                  <span className="mt-2 block text-[11px] text-muted-foreground">
                    {formatNotificationTime(notification.createdAt)}
                  </span>
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsMenu;
