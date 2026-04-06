import * as ImagePicker from 'expo-image-picker';

export function useImage() {
  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de câmera negada. Habilite nas configurações do dispositivo!');
      return null;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) return result.assets[0].uri;
    return null;
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de galeria negada. Habilite nas configurações do dispositivo!');
      return null;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) return result.assets[0].uri;
    return null;
  };

  return { openCamera, openGallery };
}
