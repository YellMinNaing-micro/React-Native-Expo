import React, { useState } from "react";
import {
    Box,
    Text,
    Input,
    InputField,
    Button,
    ButtonText,
    VStack
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "user" && password === "Password@123") {
            router.push("/home");
        } else {
            // Using a custom alert box or message instead of the native one
            console.warn("Invalid credentials!");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Box flex={1} justifyContent="center" alignItems="center" p="$5">
                <VStack space="md" w="90%" alignItems="flex-start">
                    <Text size="3xl" fontWeight="bold" color="$black">
                        Log In
                    </Text>
                    <Text size="md" color="$coolGray500">
                        Enter Explore & Enjoy
                    </Text>
                    <Text size="md" color="$black">
                        User Name
                    </Text>
                    <Input w="100%" size="lg" rounded="$2xl">
                        <InputField
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </Input>
                    <Text size="md" color="$black">
                        Password
                    </Text>
                    <Input w="100%" size="lg" rounded="$2xl">
                        <InputField
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </Input>

                    <Button
                        w="100%"
                        size="lg"
                        onPress={handleLogin}
                        backgroundColor="$blue600"
                        rounded="$2xl"
                    >
                        <ButtonText color="$white">Log In</ButtonText>
                    </Button>

                </VStack>
                <VStack p="$8" space="md" w="90%" alignItems="center">
                    <TouchableOpacity onPress={() => router.push("/register")}>
                        <Text size="sm"  color="$blue600">
                            Don't have an account?{" "}
                            <Text alignItems="center" fontWeight="bold">Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </VStack>
            </Box>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
