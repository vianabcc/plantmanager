import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    TouchableOpacityProps
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface IButtonProps extends TouchableOpacityProps{
    title: string;
}

export const Button: React.FC<IButtonProps> = ({title, ...rest}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            {...rest}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 10,
        height: 56
    },
    text: {
        fontFamily: fonts.heading,
        color: colors.white,
        fontSize: 16,
    }
})