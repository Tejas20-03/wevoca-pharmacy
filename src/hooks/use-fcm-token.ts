import { useEffect, useState } from "react";
import { getMessaging } from "firebase/messaging/sw";
import { getToken, isSupported } from "firebase/messaging";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        const checkSupport = await isSupported();
        if (checkSupport) {
          const messaging = getMessaging();
          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey:
                "",
                // "BCtYITRIc0azbdnMdJvpVa9CaZGjAdY47Ujm9OA5Mv4jmbElYjfZzb487Ik6B3-mCeM5BGxorIzqZrAgKq4ODp0",
            });
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  }, [notificationPermissionStatus]);

  return { fcmToken: token, notificationPermissionStatus };
};

export default useFcmToken;
