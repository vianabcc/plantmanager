import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import *  as Notifications from "expo-notifications";

import Routes from "./src/routes";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from "@expo-google-fonts/jost";
import {IPlantProps} from "./src/libs/storage";

const App = () => {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
        async notification => {
          const data = notification.request.content.data.plant as IPlantProps;
          console.log(data)
        });

    return () => subscription.remove();
  }, [])

  if(!fontsLoaded) return <AppLoading />;

  return (
     <Routes />
  )
}

export default App;
