export function getTelegramInitData(): string {
  return window.Telegram?.WebApp?.initData ?? "";
}

export function getTelegramUser() {
  return window.Telegram?.WebApp?.initDataUnsafe?.user;
}

export function expandApp() {
  window.Telegram?.WebApp?.expand();
}

export function haptic() {
  window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
}

export function showAlert(message: string) {
  window.Telegram?.WebApp?.showAlert(message);
}

export function showConfirm(message: string, callback: (confirmed: boolean) => void) {
  window.Telegram?.WebApp?.showConfirm(message, callback);
}

export function sendNotification(message: string, phoneNumber: string) {
  const telegramUser = getTelegramUser();
  if (telegramUser && window.Telegram?.WebApp) {
    // Create inline keyboard with call button
    const keyboard = {
      inline_keyboard: [[
        {
          text: "📞 Позвонить водителю",
          url: `tel:${phoneNumber}`
        }
      ]]
    };
    
    // Show popup with call button
    window.Telegram?.WebApp?.showPopup({
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
