import React from "react";
import {
    SafeAreaView,
    TouchableOpacity,
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from "react-native";
import { Feather } from "@expo/vector-icons";

import wateringImg from "../assets/watering.png"
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {useNavigation} from "@react-navigation/native";

export const Welcome = () => {

    const navigation = useNavigation();

    const handleStart = () => {
        navigation.navigate("UserIdentification")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {"\n"}
                    suas plantas de {"\n"}
                    forma fácil
                </Text>
                <Image
                    source={wateringImg}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather name="chevron-right" color={colors.white} size={24} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: fonts.heading,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.heading,
        marginTop: 38,
        lineHeight: 34,
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    image: {
        height: Dimensions.get("window").width * 0.7,
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    }
})