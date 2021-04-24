import React, {useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard, Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {useNavigation} from "@react-navigation/native";

export const UserIdentification = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    const handleSubmit = async () => {
        if(!name)
            return Alert.alert("Me diz como chamar você 😥️");

        try {
            await AsyncStorage.setItem("@plantmanager:user", name);
            navigation.navigate("Confirmation", {
                title: "Prontinho",
                subtitle: "Vamos começar a cuidar das suas plantinhas com muito cuidado",
                buttonTitle: "Começar",
                icon: "smile",
                nextScreen: "PlantSelect"
            })
        } catch {
             Alert.alert("Não foi possível salvar o seu nome. 😥️");
        }

    }
    const handleInputBlur = () => {
        setIsFocused(false)
        setIsFilled(!!name);
    };

    const handleInputFocus = () => {
        setIsFocused(true)
    };

    const handleInputChange = (value: string) => {
        setIsFilled(!!value);
        setName(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding": "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? "😄": "😃"}
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {"\n"}
                                    chamar você?
                                </Text>
                            </View>
                                <TextInput
                                    style={[
                                        styles.input,
                                        (isFocused || isFilled) && { borderColor: colors.green }
                                    ]}
                                    placeholder="Digite um nome"
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />
                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    content: {
        flex: 1,
        width: "100%",
    },
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 54,

    },
    header: {
        alignItems: "center"
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: "center",

    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        marginTop: 20,
        textAlign: "center",
        fontFamily: fonts.heading,
        color: colors.heading,
    },
    footer: {
        marginTop: 40,
        paddingHorizontal: 20,
        width: "100%"
    }
});