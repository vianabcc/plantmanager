import React, {useState} from "react";
import {SafeAreaView, Text, Image, StyleSheet} from "react-native";
import wateringImg from "../assets/watering.png"
import colors from "../styles/colors";
import { Button } from "../components/Button";
import {Ionicons} from "@expo/vector-icons";

export const Welcome = () => {
    const [visible, setVisible] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Gerencie {"\n"} suas plantas {"\n"} de forma fácil</Text>
            {visible && (
                <Image source={wateringImg} style={styles.image} />
            )}
            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>
            <Button onPress={() => setVisible(!visible)}>
                <Ionicons title="Imagem" name="chevron-forward-outline" color={colors.white} size={24} />
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",

    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.heading,
        marginTop: 38
    },
    subtitle: {
        textAlign: "center",
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },
    image: {
        width: 292,
        height: 284
    },
})