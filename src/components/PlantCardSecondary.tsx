import React from "react";
import {
    Animated,
    StyleSheet,
    Text, View,
} from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {Feather} from "@expo/vector-icons";

interface IPlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    },
    handleRemove: () => void;
}

export const PlantCardSecondary: React.FC<IPlantProps> = ({ data, handleRemove , ...rest}) => {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <RectButton
                       style={styles.buttonRemove}
                        onPress={handleRemove}
                    >
                        <Feather name="trash" size={32} color={colors.white} />
                    </RectButton>
                </Animated.View>
            )}
        >
            <RectButton
                style={styles.container}
                {...rest}
            >
                <SvgFromUri uri={data.photo} width={50} height={50} />
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                       Regar às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
   container: {
       width: "100%",
       borderRadius: 20,
       paddingHorizontal: 10,
       paddingVertical: 25,
       flexDirection: "row",
       alignItems: "center",
       backgroundColor: colors.shape,
       marginVertical: 5
   },
   title: {
       flex: 1,
       fontFamily: fonts.heading,
       fontSize: 17,
       marginLeft: 10,
       color: colors.heading
   },
    details: {
       alignItems: "flex-end"
    },
    timeLabel: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    buttonRemove: {
        width: 120,
        height: 85,
        backgroundColor: colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        right: 15,
        paddingLeft: 10,
    }
});