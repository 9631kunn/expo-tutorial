import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import logo from "./assets/logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  type imageType = null | { localUri: string };
  const [selectedImage, setSelectedImage] = useState<imageType>(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // 写真ライブラリへのアクセスが拒否された場合
    if (permissionResult.granted === false) {
      alert("カメラロールへのアクセス許可は必須です;;");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    // 写真ライブラリへの選択中にキャンセルされた場合
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("お使いのデバイスではシェアリングが有効ではありません;;");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>この写真をシェアしよう!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo} />

      <Text style={styles.instructions}>HELLO EXPO ^-^</Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
