import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineNotificationAdd } from "react-icons/md";
import useAuth from "../hooks/useAuth";

export function NotificationsMenu() {
  const { notifications } = useAuth();
  const [newNotification, setNewNotification] = useState(false);
  const [seenNotification, setSeenNotification] = useState([]);

  const unSeenNotification = notifications.filter(
    (notification) => !seenNotification.includes(notification.transactionID)
  );

  useEffect(() => {
    if (unSeenNotification.length > 0) {
      setNewNotification(true);
    } else {
      setNewNotification(false);
    }
  }, [notifications, unSeenNotification]);

  const handleNotification = () => {
    setSeenNotification(
      notifications.map((notification) => notification.transactionID)
    );
    setNewNotification(false);
  };
  return (
    <Menu key={notifications.length}>
      <MenuHandler>
        <IconButton variant="text">
          {newNotification ? (
            <MdOutlineNotificationAdd
              onClick={handleNotification}
              className="text-xl text-white"
            />
          ) : (
            <IoIosNotificationsOutline className="text-xl text-white" />
          )}
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2">
        {notifications.length <= 0 ? (
          <span>No Notification</span>
        ) : (
          notifications?.map((item, i) => (
            <MenuItem
              key={i}
              className="flex items-center gap-4 py-2 pl-2 pr-8"
            >
              <div className="flex flex-col gap-1">
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  {item.message}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  Camp Name: {item.campName}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-semibold"
                >
                  transactionID: {item.transactionID}
                </Typography>

                <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                  Date:{new Date(item?.date).toLocaleDateString()} at{" "}
                  {new Date(item?.date).toLocaleTimeString()}
                </Typography>
              </div>
            </MenuItem>
          ))
        )}
      </MenuList>
    </Menu>
  );
}
