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
import { useNavigation, useRoute} from "@react-navigation/native";

interface IParams {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: "smile" | "hug";
    nextScreen: string;
}

const emojis = {
    hug: "🤗️",
    smile: "😄️",
}

export const Confirmation = () => {
    const navigation = useNavigation();
    const routes = useRoute();

    const { title, subtitle, buttonTitle, icon, nextScreen } = routes.params as IParams;

    const handleMoveOn = () => {
        navigation.navigate(nextScreen)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button
                        title={buttonTitle}
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