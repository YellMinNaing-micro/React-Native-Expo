// import React from "react";
// import { Button, ButtonText, VStack, Text } from "@gluestack-ui/themed";
// import * as Print from "expo-print";
// import * as Sharing from "expo-sharing";
//
// export default function PrintScreen() {
//     // Direct print
//     const handlePrint = async () => {
//         try {
//             await Print.printAsync({
//                 html: `
//           <html>
//             <body>
//               <h1 style="color: #4F46E5;">Hello from React Native Expo!</h1>
//               <p>This will be sent to printer.</p>
//             </body>
//           </html>
//         `,
//             });
//         } catch (error) {
//             console.error("Printing error:", error);
//         }
//     };
//
//     // Generate PDF file
//     const handleGeneratePDF = async () => {
//         try {
//             const { uri } = await Print.printToFileAsync({
//                 html: `
//           <html>
//             <body>
//               <h1 style="color: #10B981;">PDF Generated!</h1>
//               <p>You can view or share this PDF.</p>
//             </body>
//           </html>
//         `,
//             });
//
//             console.log("PDF URI:", uri);
//
//             if (await Sharing.isAvailableAsync()) {
//                 await Sharing.shareAsync(uri); // share PDF
//             }
//         } catch (error) {
//             console.error("PDF generation error:", error);
//         }
//     };
//
//     return (
//         <VStack space="md" p="$4">
//             <Text fontWeight="bold" size="lg">Print Demo</Text>
//             <Button onPress={handlePrint}>
//                 <ButtonText>Print to Printer</ButtonText>
//             </Button>
//             <Button onPress={handleGeneratePDF}>
//                 <ButtonText>Generate & Share PDF</ButtonText>
//             </Button>
//         </VStack>
//     );
// }
// app/Print.tsx
import React, { useState } from "react";
import { VStack, Box, Text, Button, ButtonText, Pressable, HStack, Heading } from "@gluestack-ui/themed";
import * as Print from "expo-print";
import { useRouter } from "expo-router";
import { ChevronLeft, Handbag, Heart, Settings } from "lucide-react-native";

export default function PrintScreen() {
    const router = useRouter();
    const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

    const handlePrint = async () => {
        try {
            const {uri} = await Print.printToFileAsync({
                html: `
          <html>
            <body>
              <h1 style="color: #4F46E5;">Hello from React Native Expo!</h1>
              <p>This simulates printing.</p>
            </body>
          </html>
        `,
            });
            console.log("PDF generated at:", uri);
            alert("Print simulated! PDF file created successfully.");
        } catch (error) {
            console.error("Print error:", error);
            alert("Print failed. Check console for details.");
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleLogout = () => {
        console.log("Logging out...");
        router.replace("/");
    };

    return (
        <Box flex={1} bg="$coolGray100">
            <HStack top={40} w="$full" justifyContent="space-between" px="$5" zIndex={10}>
                <Pressable onPress={handleGoBack}>
                    <Box bg="rgba(255, 255, 255, 0.7)" rounded="$full" p="$2">
                        <ChevronLeft size={20} color="black" />
                    </Box>
                </Pressable>
                <HStack space="lg">
                    <Pressable p="$2" rounded="$full" $pressed={{ opacity: 0.7 }} onPress={() => setIsLogoutDialogVisible(true)}>
                        <Settings size={24} color="#000" />
                    </Pressable>
                </HStack>
            </HStack>

            <VStack space="md" mt="$8" p="$5">
                <Text fontWeight="bold" size="lg">
                    Print Demo
                </Text>

                <Button size="lg" rounded="$3xl" onPress={handlePrint}>
                    <ButtonText>Simulate Print</ButtonText>
                </Button>
            </VStack>

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

