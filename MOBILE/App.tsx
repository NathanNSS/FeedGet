import 'react-native-gesture-handler';
import { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, LogBox } from 'react-native';
import {
    useFonts,
    Inter_500Medium,
    Inter_400Regular
} from '@expo-google-fonts/inter';
//import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen'

import { theme } from './src/theme';
import Widget from './src/components/Widget';


export default function App() {

    const [fontsLoaded] = useFonts({
        Inter_500Medium,
        Inter_400Regular
    })

    // if (!fontsLoaded) return <AppLoading />;


    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                //await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {

        if (fontsLoaded) await SplashScreen.hideAsync();

    }, [fontsLoaded]);
    
    LogBox.ignoreLogs([
        "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ]);

    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }} onLayout={onLayoutRootView}>
            <StatusBar style="light" backgroundColor="transparent" translucent />

            <Widget />
        </View>
    );
}
