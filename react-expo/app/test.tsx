import { useLocalSearchParams, useNavigation } from "expo-router";
import { Box, Text, VStack, HStack, Image, Button, Divider, Pressable } from "@gluestack-ui/themed";
import { ChevronLeft, Handbag, ShoppingBag, Star, Heart, ShoppingCart } from "lucide-react-native";
import { products } from "../data/product";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
// Import the necessary ActionSheet components
import {
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
    ActionsheetIcon,
} from "@gluestack-ui/themed";

export default function TestScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const navigation = useNavigation();
    const product = products.find((p) => p.id === id);

    // Add state to track if the image is being pressed
    const [isPressed, setIsPressed] = useState(false);
    // State to control the visibility of the ActionSheet
    const [showActionsheet, setShowActionsheet] = useState(false);

    // Function to handle opening the ActionSheet
    const handleOpenActionsheet = () => {
        setShowActionsheet(true);
    };

    // Function to handle closing the ActionSheet
    const handleCloseActionsheet = () => {
        setShowActionsheet(false);
    };

    if (!product) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center" bg="$coolGray100">
                <Text size="lg">Product not found</Text>
            </Box>
        );
    }
    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <Box flex={1} bg="$coolGray100">
            <Box position="relative">
                {/* Wrap the Image in a Pressable component */}
                <Pressable
                    onPressIn={() => setIsPressed(true)} // Set state to true when pressed
                    onPressOut={() => setIsPressed(false)} // Set state to false when released
                >
                    <Image
                        source={product.image}
                        alt={product.name}
                        w="$full"
                        h={350}
                        resizeMode="cover"
                        // Conditionally apply a style based on the state
                        style={{ opacity: isPressed ? 0.8 : 1 }}
                    />
                </Pressable>

                {/* Your top icons remain the same */}
                <HStack position="absolute" top={40} w="$full" justifyContent="space-between" px="$5" zIndex={10}>
                    <Pressable onPress={handleGoBack}>
                        <Box bg="rgba(255, 255, 255, 0.7)" rounded="$full" p="$2">
                            <ChevronLeft size={20} color="black" />
                        </Box>
                    </Pressable>
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

            {/* The rest of your component code... */}
            <ScrollView showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                            marginTop: -20,
                            zIndex: 1,
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: -2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                        }}
            >
                {/* All the detail content goes inside the ScrollView */}
                <VStack p="$3" space="sm">
                    <Text size="2xl" py={10} fontWeight="bold">{product.name}</Text>
                    <Text size="sm" color="$coolGray500">From: Uphaar Collection</Text>
                    <HStack alignItems="center" space="sm">
                        <Text size="2xl" fontWeight="bold" color="$black">${product.price}</Text>
                        {product.oldPrice && (<Text color="$coolGray500" textDecorationLine="line-through">${product.oldPrice}</Text>)}
                        {product.discount && (
                            <Box bg="$pink500" rounded="$3xl" px="$2" py="$0">
                                <Text size="sm" color="$white">{product.discount}% OFF</Text>
                            </Box>
                        )}
                    </HStack>
                    <HStack space="xs" alignItems="center" justifyContent="flex-start">
                        <HStack alignItems="center" gap={2}>
                            {[...Array(5)].map((_, i) => (<Star key={i} size={16} color={i < product.rating ? "#facc15" : "#d1d5db"} fill={i < product.rating ? "#facc15" : "none"}/>))}
                            <Text ml={5} size="sm" color="$coolGray600">({product.reviews})</Text>
                        </HStack>
                    </HStack>
                    <Text size="sm" color="$coolGray600">434 People Bought This Item Recently</Text>
                    <Box bg="$rose50" p="$2.5" rounded="$2xl" flexDirection="row" alignItems="center">
                        <ShoppingBag size={16} style={{ marginRight: 8 }}/>
                        <Text size="sm" color="$coolGray700">New Users - Flat 15% OFF On Your First Transaction</Text>
                    </Box>
                    <Divider my="$2"/>
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
            </ScrollView>

            {/* The "Add to Cart" button at the bottom, modified to open the ActionSheet */}
            <Box p="$4" bg="$white" borderTopWidth={1} borderTopColor="$coolGray200">
                <Button size="lg" rounded="$3xl" onPress={handleOpenActionsheet}>
                    <HStack alignItems="center" space="xs">
                        <ShoppingCart size={20} color="white"/>
                        <Text color="$white" fontWeight="bold">Add To Cart</Text>
                    </HStack>
                </Button>
            </Box>

            {/* The ActionSheet component */}
            <Actionsheet isOpen={showActionsheet} onClose={handleCloseActionsheet}>
                <ActionsheetBackdrop />
                <ActionsheetContent>
                    <ActionsheetDragIndicatorWrapper>
                        <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>
                    {/* Add content specific to your product here */}
                    <VStack px="$5" py="$3" space="md" w="$full">
                        <Text size="xl" fontWeight="bold" textAlign="center">{product.name}</Text>
                        <Text size="md" color="$coolGray500" textAlign="center">Product successfully added!</Text>
                    </VStack>

                    <ActionsheetItem onPress={handleCloseActionsheet}>
                        <ActionsheetItemText>View Cart</ActionsheetItemText>
                    </ActionsheetItem>

                    <ActionsheetItem onPress={handleCloseActionsheet}>
                        <ActionsheetItemText>Continue Shopping</ActionsheetItemText>
                    </ActionsheetItem>

                    <ActionsheetItem onPress={handleCloseActionsheet}>
                        <ActionsheetItemText>Cancel</ActionsheetItemText>
                    </ActionsheetItem>
                </ActionsheetContent>
            </Actionsheet>
        </Box>
    );
}
