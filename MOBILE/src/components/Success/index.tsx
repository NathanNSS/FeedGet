import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { styles } from './stylesSuccess';
import successIMG from '../../assets/success.png'

interface Props{
    onSendAnotherFeedback: ()=>void;
}

export function Success({ onSendAnotherFeedback}:Props) {
    return (
        <View style={styles.container}>
            <Image
                source={successIMG}
                style={styles.image}
            />

            <Text style={styles.title}>
                Agradecemos o Feedback
            </Text>

            <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
                <Text style={styles.buttonTitle}>
                    Quero Enviar Outro
                </Text>
            </TouchableOpacity>
        </View>
    );
}