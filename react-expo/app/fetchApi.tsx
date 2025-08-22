// app/fetchApi.tsx
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, Text, VStack, HStack, Spinner, Button, ButtonText } from "@gluestack-ui/themed";

export default function FetchApiScreen() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const json = await res.json();
            setData(json.slice(0, 10));
            console.log(json);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Box flex={1} bg="$coolGray100" pt="$10" p="$4">
            <Text size="2xl" fontWeight="bold"  mb="$8">
                🛒 Your Cart (API Data)
            </Text>

            {loading ? (
                <HStack justifyContent="center" alignItems="center" mt="$10">
                    <Spinner size="large" color="$blue500" />
                    <Text ml="$3">Loading...</Text>
                </HStack>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Box
                            bg="$white"
                            p="$3"
                            rounded="$lg"
                            mb="$3"
                            borderWidth={1}
                            borderColor="$coolGray200"
                        >
                            <VStack>
                                <Text fontWeight="semibold">{item.title}</Text>
                                <Text size="sm" color="$coolGray600">
                                    {item.body}
                                </Text>
                            </VStack>
                        </Box>
                    )}
                />
            )}

            <Button mt="$4" onPress={fetchPosts}>
                <ButtonText>🔄 Refresh</ButtonText>
            </Button>
        </Box>
    );
}
