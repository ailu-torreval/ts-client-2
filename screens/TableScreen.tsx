import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "native-base";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Button, Card } from "@rneui/themed";
import QRCodeSVG from "react-native-qrcode-svg";
import html2canvas from "html2canvas";

type Props = NativeStackScreenProps<RootStackParamList, "tables">;

const TableScreen: React.FC<Props> = ({ navigation }) => {
  const merchant = useSelector((state: RootState) => state.merchant.merchant);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("merchant", merchant);
    console.log("merchant tables", merchant?.merchant_tables);
  }, [merchant]);

  function generateQRCode(tableId: number) {
    setSelectedTable(tableId);
    if (merchant?.id) {
      const url = `https://ts-client-sand.vercel.app/?merchantId=${merchant.id}&tableId=${tableId}`;
      setQrCodeData(url);
      setModalVisible(true);
    }
  }

  async function downloadQRCode() {
    if (qrCodeRef.current) {
      const canvas = await html2canvas(qrCodeRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `table${selectedTable}-qrcode.png`;
      link.click();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {merchant &&
          merchant.merchant_tables?.map((table) => (
            <Card key={table.id}>
              <Card.Title>Table # {table.id}</Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>
                Capacity: {table.capacity} pax.{" "}
              </Text>
              <Button
                title="Generate QR Code"
                onPress={() => {
                  generateQRCode(table.id);
                }}
              />
            </Card>
          ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>QR Code for Table # {selectedTable}</Text>
          {qrCodeData && (
            <div ref={qrCodeRef} >
            <View style={styles.qrCodeContainer}>
            <QRCodeSVG
              value={qrCodeData}
              size={200}
              />
          </View>
              </div>
          )}
          <View style={{ marginTop: 20 }}>
          <Button
              title="Download QR Code"
              onPress={downloadQRCode}
            />
            <Button type="clear" title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default TableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    padding: 35,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  qrCodeContainer: {
    backgroundColor: "white",
    padding: 10,
  },
});
