import { useLocalSearchParams, useNavigation } from "expo-router";
import { Box, Text, VStack, HStack, Image, Button, Divider, Pressable } from "@gluestack-ui/themed";
import { ChevronLeft, Handbag, ShoppingBag, Star, Heart, ShoppingCart } from "lucide-react-native";
import { products } from "../data/product";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function DetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation(); // Get the navigation object
    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center" bg="$coolGray100">
                <Text size="lg">Product not found</Text>
            </Box>
        );
    }
    // Function to handle back navigation
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <Box flex={1} bg="$coolGray100">
            {/* Product Image and Top Icons */}
            <Box position="relative">
                <Image
                    source={product.image}
                    alt={product.name}
                    w="$full"
                    h={350}
                    resizeMode="cover"
                />
                <HStack position="absolute" top={40} w="$full" justifyContent="space-between" px="$5">
                    {/* Back Button */}
                    <Pressable onPress={handleGoBack}>
                        <Box
                            bg="rgba(255, 255, 255, 0.7)"
                            rounded="$full"
                            p="$2"
                        >
                            <ChevronLeft size={20} color="black" />
                        </Box>
                    </Pressable>

                    {/* Right-aligned Icons (Heart and Bag) */}
                    <HStack space="lg">
                        <Box bg="rgba(255, 255, 255, 0.7)" rounded="$full" p="$2">
                            <Heart size={20} color="black" />
                        </Box>
                        <Box bg="rgba(255, 255, 255, 0.7)" rounded="$full" p="$2">
                            <Handbag size={20} color="black" />
                        </Box>
                    </HStack>
                </HStack>
            </Box>

            {/* Product Detail Card */}
            <Box
                flex={1}
                mt={-20}
                borderTopLeftRadius="$3xl"
                borderTopRightRadius="$3xl"
                p="$3"
                bg="$white"
                shadowColor="black"
                shadowOffset={{ width: 0, height: -2 }}
                shadowOpacity={0.1}
                shadowRadius={8}
            >
                <VStack space="sm">
                    {/* Title and Collection */}
                    <Text size="2xl" py={10} fontWeight="bold">
                        {product.name}
                    </Text>
                    <Text size="sm" color="$coolGray500">
                        From: Uphaar Collection
                    </Text>

                    {/* Price & Discount */}
                    <HStack alignItems="center" space="sm">
                        <Text size="2xl" fontWeight="bold" color="$black">
                            ${product.price}
                        </Text>
                        {product.oldPrice && (
                            <Text color="$coolGray500" textDecorationLine="line-through">
                                ${product.oldPrice}
                            </Text>
                        )}
                        {product.discount && (
                            <Box bg="$pink500" rounded="$3xl" px="$2" py="$0">
                                <Text size="sm" color="$white">
                                    {product.discount}% OFF
                                </Text>
                            </Box>
                        )}
                    </HStack>

                    {/* Ratings & Bought Count */}
                    <HStack space="xs" alignItems="center" justifyContent="flex-start">
                        <HStack alignItems="center" gap={2}>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    color={i < product.rating ? "#facc15" : "#d1d5db"}
                                    fill={i < product.rating ? "#facc15" : "none"}
                                />
                            ))}
                            <Text ml={5} size="sm" color="$coolGray600">
                                ({product.reviews})
                            </Text>
                        </HStack>
                    </HStack>

                    <Text size="sm" color="$coolGray600">
                        434 People Bought This Item Recently
                    </Text>

                    {/* New User Discount */}
                    <Box bg="$rose50" p="$2.5" rounded="$2xl" flexDirection="row" alignItems="center">
                        <ShoppingBag size={16} style={{ marginRight: 8 }} />
                        <Text size="sm" color="$coolGray700">
                            New Users - Flat 15% OFF On Your First Transaction
                        </Text>
                    </Box>

                    {/* Product Specs */}
                    <Divider my="$2" />
                    <VStack space="sm">
                        <Text size="md" fontWeight="semibold">The Paanita Ring</Text>
                        <HStack justifyContent="space-between">
                            <VStack space="xs">
                                <Text size="sm" color="$coolGray600">Product Code</Text>
                                <Text size="sm" color="$coolGray600">Height</Text>
                                <Text size="sm" color="$coolGray600">Width</Text>
                                <Text size="sm" color="$coolGray600">Product Weight (Approx)</Text>
                            </VStack>
                            <VStack space="xs" alignItems="flex-end">
                                <Text size="sm" color="$coolGray800">026409-5705875</Text>
                                <Text size="sm" color="$coolGray800">20.7 mm</Text>
                                <Text size="sm" color="$coolGray800">6.0 mm</Text>
                                <Text size="sm" color="$coolGray800">2.14 gram</Text>
                            </VStack>
                        </HStack>
                    </VStack>
                </VStack>
            </Box>

            {/* Add to Cart Button */}
            <Box p="$4" bg="$white" borderTopWidth={1} borderTopColor="$coolGray200">
                <Button size="lg" rounded="$3xl" >
                    <HStack alignItems="center" space="xs">
                        <ShoppingCart size={20} color="white" />
                        <Text color="$white" fontWeight="bold">Add To Cart</Text>
                    </HStack>
                </Button>
            </Box>
        </Box>
    );
}