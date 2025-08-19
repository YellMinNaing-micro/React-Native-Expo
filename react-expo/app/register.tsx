import React, { useState } from "react";
import { Box, Text, Input, InputField, Button } from "@gluestack-ui/themed";
import { router } from "expo-router";

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        alert(`Account created for ${username}`);
        router.replace("/");
    };

    return (
        <Box flex={1} justifyContent="center" alignItems="center" p="$5">
            <Text size="2xl" mb="$5">Register</Text>

            <Input mb="$3" w="80%">
                <InputField
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
            </Input>

            <Input mb="$3" w="80%">
                <InputField
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </Input>

            <Button w="80%" mb="$3" onPress={handleRegister}>
                <Text color="white">Register</Text>
            </Button>

            <Button w="80%" variant="outline" onPress={() => router.back()}>
                <Text>Back to Login</Text>
            </Button>
        </Box>
    );
}
