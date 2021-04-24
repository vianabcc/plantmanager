import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList, ActivityIndicator,
} from "react-native";

import { Loader } from "../components/Loader";
import { Header } from "../components/Header";
import { EnvironmentButton } from "../components/EnvironmentButton";
import {PlantCardPrimary} from "../components/PlantCardPrimary";
import {useNavigation} from "@react-navigation/core";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import api from "../services/api";
import { IPlantProps } from "../libs/storage";

interface IEnvironmentProps {
  key: string;
  title: string;
}

export const PlantSelect = () => {
    const [environments, setEnvironments] = useState<IEnvironmentProps[]>([]);
    const [plants, setPlants] = useState<IPlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<IPlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState("all")
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)

    const navigation = useNavigation();

    const fetchPlants = async () => {
        const { data } = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`)

        if(!data) return setLoading(true)

        if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        } else {
            setPlants(data);
            setFilteredPlants(data)
        }

        setLoading(false)
        setLoadingMore(false)
    }

    const handleSelectEnvironment = (environment: string) => {
        setEnvironmentSelected(environment);

        if(environment === "all") {
            setFilteredPlants(plants);
            return;
        }

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        )

        setFilteredPlants(filtered)
    }

    const handleFetchMore = (distance: number) => {
       if(distance < 1) return;

       setLoadingMore(true);
       setPage(oldValue => oldValue + 1);
       fetchPlants();
    }

    const handlePlantSelect = (plant: IPlantProps) => {
        navigation.navigate("PlantSave", { plant })
    }

    useEffect(() => {
        (async () => {
            const { data } = await api
                .get("plants_environments?_sort=title&order=asc")
            setEnvironments([
                {
                    key: "all",
                    title: "Todos"
                },
                ...data
            ]);
        })()
    }, [])

    useEffect(() => {
        fetchPlants()
    }, [])

    if(loading) return <Loader />

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View style={styles.header}>
                <FlatList
                    data={environments}
                    keyExtractor={( item ) => String(item.key)}
                    renderItem={
                        ({item}) => <EnvironmentButton
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleSelectEnvironment(item.key)}
                        />
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={( item ) => String(item.id)}
                    renderItem={
                        ({item}) => (
                            <PlantCardPrimary
                                data={item}
                                onPress={() => handlePlantSelect(item)}
                            />
                        )
                    }
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 32
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
    },
    environmentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center",
    },
});