import React, { useEffect, useState} from "react";
import {
    StyleSheet,
    Image,
    View,
    Text,
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import userImg from "../assets/avatar.png"
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Header: React.FC = () => {
    const [userName, setUserName] = useState<string>()

    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem("@plantmanager:user")
            setUserName(user || "")
        })()
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá, </Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image source={userImg} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: colors.red,
        marginTop: getStatusBarHeight(),
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    }
})