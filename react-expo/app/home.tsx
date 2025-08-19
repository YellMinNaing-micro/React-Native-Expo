import React, { useState } from "react";
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
} from "lucide-react-native";
import { FlatList, Platform, StyleSheet } from "react-native";

// Define the type for a product object
interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
}

// Define the props for the ProductCard component
interface ProductCardProps {
    product: Product;
}

// This is the component for a single product card
const ProductCard = ({product}: ProductCardProps) => {
    const imageSource = typeof product.image === 'string'
        ? {uri: product.image}
        : product.image;

    return (
        <VStack
            bg="$white"
            p="$2"
            rounded="$lg"
            borderWidth="$1"
            borderColor="$coolGray200"
            m="$1"
            width="50%"
            space="md"
            style={{
                ...Platform.select({
                    ios: {
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                    },
                    android: {
                        elevation: 3,
                    },
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
            <Box position="absolute" top="$3" right="$1" bg="$red500" rounded="$full" px="$2" py="$0">
                <Text color="$white" size="xs" fontWeight="bold">New</Text>
            </Box>
            <VStack>
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
                        $pressed={{opacity: 0.7}}
                    >
                        <Plus color="white" size={16}/>
                    </Pressable>
                </HStack>
            </VStack>
        </VStack>
    );
};

// This is the main screen component
export default function HomeScreen() {
    const router = useRouter();
    // 1. Add state to manage the selected item
    const [selectedOption, setSelectedOption] = useState("Payment");

    const products: Product[] = [
        {
            id: "1",
            name: "Sterling Silver",
            description: "Sterling Silver 1s Silver Alloy",
            price: "84.99",
            image: require("../assets/images/my-pics/1.png"),
        },
        {
            id: "2",
            name: "Sterling Silver",
            description: "Sterling Silver 1s Silver Alloy",
            price: "84.99",
            image: require("../assets/images/my-pics/2.png"),
        },
        {
            id: "3",
            name: "Sterling Silver",
            description: "Sterling Silver 1s Silver Alloy",
            price: "84.99",
            image: require("../assets/images/my-pics/3.png"),
        },
        {
            id: "4",
            name: "လက်စွပ်",
            description: "အောင်ရဲလင်းလက်စွပ်",
            price: "84.99",
            image: require("../assets/images/my-pics/ring.png"),
        },
        {
            id: "5",
            name: "Sterling Silver",
            description: "Sterling Silver 1s Silver Alloy",
            price: "84.99",
            image: require("../assets/images/my-pics/1.png"),
        },
        {
            id: "6",
            name: "Sterling Silver",
            description: "Sterling Silver 1s Silver Alloy",
            price: "84.99",
            image: require("../assets/images/my-pics/2.png"),
        },
        {
            id: "7",
            name: "Sterling Silver",
            description: "Sterling Silver 1s Silver Alloy",
            price: "84.99",
            image: require("../assets/images/my-pics/3.png"),
        },
    ];

    const menuOptions = [
        {label: "Payment", icon: ShoppingCart},
        {label: "Secure Logistics", icon: Package},
        {label: "Contract", icon: ClipboardPen},
        {label: "Setting", icon: ShoppingCart},
        {label: "Secure", icon: Package},
        {label: "Just", icon: ClipboardPen},
        // You only need to define them once here
    ];

    return (
        <Box flex={1} gap={4} bg="$coolGray50" pt="$10">
            {/* Header Section */}
            <HStack justifyContent="space-between" alignItems="center" px="$2">
                <Pressable onPress={() => router.back()} p="$2" rounded="$full" $pressed={{opacity: 0.7}}>
                    <ChevronLeft size={24} color="#000"/>
                </Pressable>
                <Heading size="lg" fontWeight="bold">
                    Shopping Bag
                </Heading>
                <HStack>
                    <Pressable p="$2" rounded="$full" $pressed={{opacity: 0.7}}>
                        <Search size={24} color="#000"/>
                    </Pressable>
                    <Pressable p="$2" rounded="$full" $pressed={{opacity: 0.7}}>
                        <Edit size={24} color="#000"/>
                    </Pressable>
                </HStack>
            </HStack>

            {/* Sub-header with options */}
            <ScrollView mt="$3" horizontal showsHorizontalScrollIndicator={false} py="$0" px="$2">
                <HStack space="xs" alignItems="center">
                    {menuOptions.map((option) => {
                        const isSelected = selectedOption === option.label;
                        const backgroundColor = isSelected ? "$black" : "$coolGray200";
                        const textColor = isSelected ? "$white" : "$coolGray800";
                        const iconColor = isSelected ? "white" : "black";
                        const IconComponent = option.icon;

                        return (
                            <Pressable
                                key={option.label} // Use a unique key
                                onPress={() => setSelectedOption(option.label)}
                                $pressed={{opacity: 0.7}}
                            >
                                <HStack space="xs" alignItems="center" bg={backgroundColor} px="$4" py="$2"
                                        rounded="$full">
                                    <IconComponent size={16} color={iconColor}/>
                                    <Text size="sm" color={textColor}>{option.label}</Text>
                                </HStack>
                            </Pressable>
                        );
                    })}
                </HStack>
            </ScrollView>

            <FlatList
                data={products}
                renderItem={({item}) => <ProductCard product={item}/>}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingEnd: 16, paddingBottom: 16}} // Adjust padding at the end
                columnWrapperStyle={{justifyContent: 'space-between', paddingHorizontal: 8}}
            />
        </Box>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 150,
    },
});