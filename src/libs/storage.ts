import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import  * as Notifications from "expo-notifications";

export interface IPlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
  dateTimeNotification: Date;
  hour: string;
}

export interface IStoragePlantProps {
    [id: string]: {
        data: IPlantProps,
        notificationId: string,
    }
}

export const savePlant = async (plant: IPlantProps): Promise<void> => {
    try {
        const nextTime = new Date(plant.dateTimeNotification);
        const now = new Date();

        const {times, repeat_every} = plant.frequency;

        if(repeat_every === "week") {
            const interval = Math.trunc(7/times);
            nextTime.setDate(now.getDate() + interval)
        } else {
            nextTime.setDate(nextTime.getDate() + 1)
        }

        const seconds = Math.abs(
            Math.ceil((now.getTime() - nextTime.getTime())/1000)
        )

        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Heeeey, 🌱",
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
            },
            trigger: {
                seconds: seconds < 60 ? 60 : seconds,
                repeats: true
            }
        })

        const data = await AsyncStorage.getItem("@plantmanager:plants");
        const oldPlants = data ? (JSON.parse(data) as IStoragePlantProps): {};

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }

        await AsyncStorage.setItem(
            "@plantmanager:plants",
               JSON.stringify({...oldPlants, ...newPlant})
        );
    } catch (e) {
        throw new Error(e);
    }
};

export const loadPlant = async (): Promise<IPlantProps[]> => {
    try {
        const data = await AsyncStorage.getItem("@plantmanager:plants");
        const plants = data ? (JSON.parse(data) as IStoragePlantProps): {};

        return Object
            .keys(plants)
            .map(plant => {
                return {
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), "HH:mm")
                }
            })
            .sort((a, b) =>
                Math.floor(
                    new Date(a.dateTimeNotification).getTime()/1000 -
                    Math.floor(new Date(b.dateTimeNotification).getTime()/1000
                ))
            )
    } catch (e) {
        throw new Error(e);
    }
};

export const removePlant = async (id: string): Promise<void> => {
    try {
        const data = await AsyncStorage.getItem("@plantmanager:plants");
        const plants = data ? (JSON.parse(data) as IStoragePlantProps) : {};

        await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId)
        delete plants[id];

        await AsyncStorage.setItem(
        "@plantmanager:plants",
            JSON.stringify(plants)
        );
    } catch (e) {
        throw new Error(e);
    }

}