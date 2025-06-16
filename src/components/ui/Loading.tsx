import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View testID="loading-container" className="flex-1 justify-center items-center bg-background">
      <ActivityIndicator size="large" />
    </View>
  );
}
