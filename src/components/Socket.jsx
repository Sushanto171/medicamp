import useAuth from "../hooks/useAuth";

const useSocket = () => {
  // const socketRef = useRef(null);
  const { setNotifications } = useAuth();

  //   connection websocket
  // useEffect(() => {
  //   // Establish websocket connection
  //   socketRef.current = new WebSocket("wss://medi-camp-server-mu.vercel.app/");
  //   socketRef.current.onopen = () => {
  //     //   console.log("Connected to websocket server");
  //   };
  //   socketRef.current.onmessage = (e) => {
  //     const message = e.data;
  //     const jsonString = message.substring(message.indexOf("{"));

  //     // Parse the JSON string
  //     const notificationData = JSON.parse(jsonString);

  //     // Extract relevant fields
  //     //   const { transactionID, campName, date } = notificationData;

  //     setNotifications((prev) => [...prev, notificationData]);
  //   };

  //   socketRef.current.onclose = () => {
  //     //   console.log("disconnected form websocket server");
  //   };

  //   return () => socketRef.current.close();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const sendNotification = (transactionID, campName) => {
    setNotifications((prev) => [
      ...prev,
      {
        transactionID,
        campName,
        message: "Payment successful",
        date: new Date(),
      },
    ]);
  };
  return { sendNotification };
};

export default useSocket;
