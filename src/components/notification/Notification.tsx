import { NotificationContent } from "./NotificationContent";

export type NotificationPropsType = {
  children: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
};

export const Notification = ({
  children,
  isActive,
  onClose,
}: NotificationPropsType) => {
  return (
    isActive && (
      <NotificationContent onClose={onClose}>{children}</NotificationContent>
    )
  );
};

Notification.displayName = "Notification";
