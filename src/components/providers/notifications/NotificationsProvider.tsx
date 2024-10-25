"use client";

import { useCallback, useState } from "react";
import { NotificationPropsType, NotificationsProviderContext } from "./NotificationsProviderContext";
import { Notification } from "@/components/notification/Notification";
import { uuid } from "@/utils/uuid/uuid";

export type NotificationsProviderPropsType = {
  children: React.ReactNode;
};

export const NotificationsProvider = ({ children }: NotificationsProviderPropsType) => {
  const [notifications, setNotifications] = useState<NotificationPropsType[]>([]);

  const openNotification = useCallback((props: NotificationPropsType) => {
    setNotifications((notifications) => {
      if (props.id) {
        if (notifications.find((notification) => notification.id === props.id)) {
          return notifications;
        }
      }

      return [...notifications, props.id ? props : { ...props, id: uuid() }];
    });
  }, []);

  const closeNotification = useCallback((id?: string) => {
    if (!id) {
      setNotifications((notifications) => notifications.slice(0, -1));
    } else {
      setNotifications((notifications) => notifications.filter((notification) => notification.id !== id));
    }
  }, []);

  return (
    <NotificationsProviderContext.Provider
      value={{ openNotification, closeNotification }}
    >
      {children}
      <div className="flex overflow-hidden flex-col items-center fixed w-[300px] z-[300] -translate-x-1/2 left-1/2 bottom-2">
        {notifications.map(
          ({
            id,
            children,
            onClose,
          }) => (
            <Notification
              key={id}
              isActive={true}
              onClose={onClose}
            >
              {children}
            </Notification>
          )
        )}
      </div>
    </NotificationsProviderContext.Provider>
  );
};

NotificationsProvider.displayName = "NotificationsProvider";
