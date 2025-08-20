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
import { TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RegisterScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        // Implement your registration logic here
        // Using a custom message instead of a native alert
        console.warn(`Account created for ${username}`);
        router.replace("/");
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <StatusBar style="dark" />
            <Box flex={1} justifyContent="center" alignItems="center"  p="$5">
                <VStack space="md" w="90%" alignItems="flex-start">
                    <Text size="3xl" fontWeight="bold" color="$black">
                        Sign Up
                    </Text>
                    <Text size="md" color="$coolGray500">
                        Start Your Journey.
                    </Text>
                    <Text size="md" color="$black">
                        User Name
                    </Text>
                    <Input w="100%" size="lg" rounded="$2xl">
                        <InputField
                            placeholder="Full name"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </Input>
                    <Text size="md" color="$black">
                        Email address
                    </Text>
                    <Input w="100%" size="lg" rounded="$2xl">
                        <InputField
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
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
                        onPress={handleRegister}
                        backgroundColor="$blue600"
                        rounded="$2xl"
                    >
                        <ButtonText color="$white">Sign Up</ButtonText>
                    </Button>

                </VStack>
                <VStack space="md" w="90%" alignItems="center" p="$8">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text size="sm" color="$blue600">
                            Already have an account?{" "}
                            <Text fontWeight="bold">Sign In</Text>
                        </Text>
                    </TouchableOpacity>
                </VStack>
            </Box>
        </KeyboardAvoidingView>
    );
}
