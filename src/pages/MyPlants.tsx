import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert,
} from "react-native";
import {formatDistance } from "date-fns";
import { pt } from "date-fns/locale"
import {IPlantProps, loadPlant, removePlant} from "../libs/storage";
import {Header} from "../components/Header";
import {PlantCardSecondary} from "../components/PlantCardSecondary";
import {Loader} from "../components/Loader";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import waterdrop from "../assets/waterdrop.png";

export const MyPlants: React.FC = () => {
    const [myPlants, setMyPlants] = useState<IPlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [noPlantsAvailable, setNoPlantsAvailable] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    const handleRemove = (plant: IPlantProps) => {
        Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
            {
                text: "Não 🙏️",
                style: "cancel"
            },
            {
                text: "Sim 😣️️",
                onPress: async () => {
                    try {
                        await removePlant(plant.id)
                        setMyPlants(oldData => oldData.filter(item => item.id !== plant.id));

                    } catch (e) {
                        Alert.alert("Não foi possível remover! 😣️")
                    }
                }
            }
        ])
    }

    useEffect(() => {
        (async () => {
            const plantsStoraged = await loadPlant();

            if(plantsStoraged.length === 0) {
                setLoading(false)
            } else {
                 const nextTime = formatDistance(
                    new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                    new Date().getTime(),
                     { locale: pt }
                )

                setNextWatered(
                    `Não esqueça de regar a ${plantsStoraged[0].name} daqui à ${nextTime}`
                )
                setMyPlants(plantsStoraged);
                setNoPlantsAvailable(false)
                setLoading(false)
            }
        })()
    }, [])

    if(loading) return <Loader />

    if(noPlantsAvailable)
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.warningContainer}>
                    <Text style={styles.emoji}>
                        🙁
                    </Text>
                    <Text style={styles.noPlantsAvailableText}>
                        Não existe nenhuma planta cadastrada!
                    </Text>
                </View>
            </View>
        )

    return (
        <View style={styles.container}>
            <Header />

            {nextWatered && (
                <View style={styles.spotlight}>
                    <Image style={styles.spotlightImage} source={waterdrop}/>
                    <Text style={styles.spotlightText}>
                        {nextWatered}
                    </Text>
                </View>
            )}
            <View style={styles.plants}>
                 <Text style={styles.plantTitle}>
                    Próximas regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) =>
                        <PlantCardSecondary
                            data={item}
                            handleRemove={() => handleRemove(item)}
                        />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    spotlightImage:{
        width: 60,
        height: 60,
    },
    spotlightText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: "100%"
    },
    plantTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    },
    emoji:{
        fontSize: 80,
    },
    warningContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    noPlantsAvailableText: {
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 24,
        textAlign: "center",
    }

})