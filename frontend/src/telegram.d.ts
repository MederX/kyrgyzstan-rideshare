interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
  };
  expand: () => void;
  close: () => void;
  HapticFeedback?: {
    impactOccurred: (style: "light" | "medium" | "heavy") => void;
  };
  BackButton?: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  showAlert?: (message: string) => void;
  showConfirm?: (message: string, callback: (confirmed: boolean) => void) => void;
  showPopup?: (params: {
    title: string;
    message: string;
    buttons: Array<{
      id: string;
      type: "default" | "ok" | "close" | "cancel" | "destructive";
      text: string;
    }>;
  }, callback?: (buttonId: string) => void) => void;
}

interface Window {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
}
