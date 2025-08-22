// // app/nfcScan.tsx
// import React, { useState } from "react";
// import { Alert } from "react-native";
// import NfcManager, { NfcTech } from "react-native-nfc-manager";
// import { Button, VStack, Box, Text } from "@gluestack-ui/themed";
//
// NfcManager.start();
//
// export default function NfcScan() {
//     const [tag, setTag] = useState<string | null>(null);
//
//     const startScan = async () => {
//         try {
//             await NfcManager.requestTechnology(NfcTech.Ndef);
//             const scannedTag = await NfcManager.getTag();
//             setTag(JSON.stringify(scannedTag, null, 2));
//         } catch (e) {
//             Alert.alert("Error", "NFC scan failed or not supported");
//         } finally {
//             await NfcManager.cancelTechnologyRequest();
//         }
//     };
//
//     return (
//         <VStack p="$4" space="md" alignItems="center">
//             <Box bg="$coolGray100" p="$4" rounded="$2xl" w="90%">
//                 <Text fontWeight="bold" size="lg" color="$coolGray800">
//                     NFC/RFID Scanner
//                 </Text>
//                 <Text mt="$2" color="$coolGray700">
//                     {tag || "No tag scanned yet"}
//                 </Text>
//             </Box>
//
//             <Button onPress={startScan}>
//                 <Text color="$white">Scan NFC Tag</Text>
//             </Button>
//         </VStack>
//     );
// }
