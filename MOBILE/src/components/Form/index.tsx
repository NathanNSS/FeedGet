import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { IFeedbackType } from '../Widget';
import { Button } from '../Button';

import { styles } from './stylesForm';
import { theme } from '../../theme';
import { api } from '../../server/api';

interface Props {
    feedbackType: IFeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackSent, onFeedbackCanceled }: Props) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [comment, setComment] = useState<string>("")

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
            .then(uri => setScreenshot(uri))
            .catch(error => console.log(error))
    }

    function handleScreenshotRemove(){
        setScreenshot(null)
    }

    async function handleSendFeedback(){
        if(isSendingFeedback){
            return null;
        }

        setIsSendingFeedback(true);
        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'});

        try{
            await api.post('/feedbacks',{
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment: comment
            });

            onFeedbackSent();
        }
        catch (error){
            console.log(error)
            setIsSendingFeedback(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>

            </View>

            <TextInput
                multiline={true}
                textAlignVertical={"top"}
                style={styles.input}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={text => setComment(text)}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    screenshot={screenshot}
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                />
                <Button isLoading={isSendingFeedback} onPress={handleSendFeedback} />
            </View>
        </View>
    );
}