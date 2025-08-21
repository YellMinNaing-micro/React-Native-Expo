import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Text,
    VStack,
    HStack,
    ScrollView,
    Image,
    Pressable,
    Heading,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import {
    ChevronLeft,
    Search,
    Edit,
    ShoppingCart,
    Package,
    ClipboardPen,
    Plus,
    Settings,
} from "lucide-react-native";
import { FlatList, Platform, StyleSheet, Animated } from "react-native";
import { Product, products } from "../data/product";
import { StatusBar } from "expo-status-bar";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const router = useRouter();
    const imageSource =
        typeof product.image === "string"
            ? { uri: product.image }
            : product.image;

    return (
        <VStack
            bg="$white"
            rounded="$2xl"
            borderWidth="$1"
            borderColor="$coolGray200"
            m="$1"
            width="50%"
            space="md"
            style={{
                ...Platform.select({
                    ios: {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                    },
                    android: { elevation: 3 },
                }),
            }}
        >
            <Image
                source={imageSource}
                alt={product.name}
                style={styles.image}
                rounded="$lg"
                resizeMode="contain"
            />
            <Box
                position="absolute"
                top="$3"
                right="$1"
                bg="$red500"
                rounded="$full"
                px="$2"
                py="$0"
            >
                <Text color="$white" size="xs" fontWeight="bold">
                    New
                </Text>
            </Box>

            <VStack bg="$coolGray100" p="$2" rounded="$2xl">
                <Text size="sm" py="$1.5" fontWeight="semibold" color="$coolGray800">
                    {product.name}
                </Text>
                <Text size="xs" py="$1.5" color="$coolGray500">
                    {product.description}
                </Text>

                <HStack justifyContent="space-between" alignItems="center" mt="$2">
                    <Text size="md" fontWeight="bold" color="$blue500">
                        ${product.price}
                    </Text>
                    <Pressable
                        bg="$blue500"
                        rounded="$full"
                        p="$2"
                        $pressed={{ opacity: 0.7 }}
                        onPress={() => router.push(`/${product.id}`)}
                    >
                        <Plus color="white" size={16} />
                    </Pressable>
                </HStack>
            </VStack>
        </VStack>
    );
};

export default function HomeScreen() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState("Payment");
    const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

    const menuOptions = [
        { label: "Payment", icon: ShoppingCart },
        { label: "Secure Logistics", icon: Package },
        { label: "Contract", icon: ClipboardPen },
        { label: "Setting", icon: Settings },
        { label: "Secure", icon: Package },
        { label: "Just", icon: ClipboardPen },
    ];

    const animatedValues = useRef(
        menuOptions.reduce((acc, option) => {
            acc[option.label] = new Animated.Value(
                option.label === selectedOption ? 1 : 0
            );
            return acc;
        }, {} as Record<string, Animated.Value>)
    ).current;

    useEffect(() => {
        menuOptions.forEach((option) => {
            Animated.timing(animatedValues[option.label], {
                toValue: option.label === selectedOption ? 1 : 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        });
    }, [selectedOption]);

    const handleLogout = () => {
        console.log("Logging out...");
        router.replace("/");
    };

    return (
        <Box flex={1} gap={4} bg="$coolGray50" pt="$10">
            <StatusBar style="dark" />
            <HStack justifyContent="space-between" alignItems="center" px="$2">
                <Pressable
                    onPress={() => router.back()}
                    p="$2"
                    rounded="$full"
                    $pressed={{ opacity: 0.7 }}
                >
                    <ChevronLeft size={24} color="#000" />
                </Pressable>
                <Heading size="lg" fontWeight="bold">
                    Shopping Bag
                </Heading>
                <HStack>
                    <Pressable p="$2" rounded="$full" $pressed={{ opacity: 0.7 }}>
                        <Search size={24} color="#000" />
                    </Pressable>
                    <Pressable p="$2" rounded="$full" $pressed={{ opacity: 0.7 }} onPress={() => setIsLogoutDialogVisible(true)}>
                        <Settings size={24} color="#000" />
                    </Pressable>
                </HStack>
            </HStack>

            <ScrollView
                mt="$3"
                horizontal
                showsHorizontalScrollIndicator={false}
                py="$0"
                px="$2"
            >
                <HStack space="xs" alignItems="center">
                    {menuOptions.map((option) => {
                        const IconComponent = option.icon;
                        const animatedBg = animatedValues[option.label].interpolate({
                            inputRange: [0, 1],
                            outputRange: ["#E5E7EB", "#3B82F6"],
                        });
                        const isSelected = selectedOption === option.label;
                        const textColor = isSelected ? "#FFFFFF" : "#1F2937";
                        const iconColor = isSelected ? "#FFFFFF" : "#000000";

                        return (
                            <Pressable
                                key={option.label}
                                onPress={() => setSelectedOption(option.label)}
                            >
                                <Animated.View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        borderRadius: 9999,
                                        backgroundColor: animatedBg,
                                        marginRight: 8,
                                    }}
                                >
                                    <IconComponent size={16} color={iconColor} />
                                    <Text
                                        size="sm"
                                        color={textColor}
                                        style={{ marginLeft: 8 }}
                                    >
                                        {option.label}
                                    </Text>
                                </Animated.View>
                            </Pressable>
                        );
                    })}
                </HStack>
            </ScrollView>

            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard product={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingEnd: 16, paddingBottom: 16 }}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    paddingHorizontal: 8,
                }}
            />

            {isLogoutDialogVisible && (
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    justifyContent="center"
                    alignItems="center"
                    bg="rgba(0, 0, 0, 0.5)"
                >
                    <VStack
                        bg="$white"
                        p="$5"
                        rounded="$lg"
                        width="$80"
                        alignItems="center"
                        space="md"
                    >
                        <Heading size="md" color="$coolGray800">Logout</Heading>
                        <Text color="$coolGray500" textAlign="center">Are you sure you want to log out?</Text>
                        <HStack space="md">
                            <Pressable
                                onPress={() => setIsLogoutDialogVisible(false)}
                                flex={1}
                                p="$3"
                                rounded="$full"
                                bg="$coolGray200"
                                $pressed={{ opacity: 0.7 }}
                            >
                                <Text textAlign="center" color="$coolGray800" fontWeight="bold">
                                    Cancel
                                </Text>
                            </Pressable>
                            <Pressable
                                onPress={handleLogout}
                                flex={1}
                                p="$3"
                                rounded="$full"
                                bg="$red500"
                                $pressed={{ opacity: 0.7 }}
                            >
                                <Text textAlign="center" color="$white" fontWeight="bold">
                                    Logout
                                </Text>
                            </Pressable>
                        </HStack>
                    </VStack>
                </Box>
            )}
        </Box>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 150,
    },
});