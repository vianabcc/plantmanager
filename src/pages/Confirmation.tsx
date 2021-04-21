import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text
} from "react-native";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {useNavigation} from "@react-navigation/native";

export const Confirmation = () => {
    const navigation = useNavigation()

    const handleMoveOn = () => {
        navigation.navigate("PlantSelect")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😄
                </Text>
                <Text style={styles.title}>
                    Prontinho
                </Text>
                <Text style={styles.subtitle}>
                    Vamos começar a cuidar das suas plantinhas com muito cuidado.
                </Text>
                <View style={styles.footer}>
                    <Button
                        title="Começar"
                        onPress={handleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 30,
    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 22,
        lineHeight: 38,
        marginTop: 15,
        textAlign: "center",
        fontFamily: fonts.heading,
        color: colors.heading,
    },
    subtitle: {
        fontSize: 17,
        paddingVertical: 10,
        textAlign: "center",
        fontFamily: fonts.text,
        color: colors.heading,
    },
    footer: {
        marginTop: 20,
        paddingHorizontal: 50,
        width: "100%"
    }
});