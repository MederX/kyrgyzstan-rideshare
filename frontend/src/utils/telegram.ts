export function getTelegramInitData(): string {
  return window.Telegram?.WebApp?.initData ?? "";
}

export function getTelegramUser() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user;
}

export function expandApp() {
  if (window.Telegram?.WebApp?.expand) {
    window.Telegram.WebApp.expand();
  }
}

export function haptic() {
  if (window.Telegram?.WebApp?.HapticFeedback?.impactOccurred) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
  }
}

export function sendNotification(message: string, phoneNumber: string) {
  const telegramUser = getTelegramUser();
  if (telegramUser && window.Telegram?.WebApp?.showPopup) {
    window.Telegram.WebApp.showPopup({
      title: "Бронирование подтверждено!",
      message: message,
      buttons: [
        {
          id: "call",
          type: "default",
          text: "📞 Позвонить"
        },
        {
          id: "close", 
          type: "cancel",
          text: "Закрыть"
        }
      ]
    }, (buttonId) => {
      if (buttonId === "call") {
        window.open(`tel:${phoneNumber}`, '_self');
      }
    });
  }
}
