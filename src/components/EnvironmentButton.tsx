import React from "react";
import {
    StyleSheet,
    Text,
} from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler"
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface IEnvironmentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export const EnvironmentButton: React.FC<IEnvironmentButtonProps> = ({
    title,
    active = false,
    ...rest
}) => {
    return (
        <RectButton
            style={[styles.container, active && styles.containerActive]}
            {...rest}
        >
            <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        marginBottom: 10,
        marginHorizontal: 5
    },
    containerActive: {
        backgroundColor: colors.green_light,
    },
    text: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 16,
    },
    textActive: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
    }
})