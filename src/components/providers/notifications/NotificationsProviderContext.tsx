import { createContext, RefObject } from "react";

export type NotificationPropsType = {
  id?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export type NotificationsProviderContextType = {
  openNotification: (props: NotificationPropsType) => void;
  closeNotification: (id?: string) => void;
};

export const NotificationsProviderContext =
  createContext<NotificationsProviderContextType>({
    openNotification: () => {},
    closeNotification: () => {},
  });

NotificationsProviderContext.displayName = "NotificationsProvider.Context";
