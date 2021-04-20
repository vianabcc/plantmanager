import React from "react";
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from "react-native";
import colors from "../styles/colors";

interface IButtonProps extends TouchableOpacityProps{
    title?: string;
}

export const Button: React.FC<IButtonProps> = ({title, children, ...rest}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            {...rest}
        >
            {title}
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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