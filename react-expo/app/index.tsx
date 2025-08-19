import React, { useState } from "react";
import { Box, Text, Input, InputField, Button } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "user" && password === "Password@123") {
            router.push("/todo" as any); // ✅ works because app/todo.tsx exists
        } else {
            alert("Invalid credentials!");
        }
    };

    return (
        <Box flex={1} justifyContent="center" alignItems="center" p="$5">
            <Text size="2xl" mb="$5">Login</Text>

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

            <Button w="80%" mb="$3" onPress={handleLogin}>
                <Text color="white">Login</Text>
            </Button>

            <Button w="80%" variant="outline" onPress={() => router.push("/register" as any)}>
                <Text>Register</Text>
            </Button>
        </Box>
    );
}
