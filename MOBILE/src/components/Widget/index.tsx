import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native'
import BottomSheet from '@gorhom/bottom-sheet';

import { styles } from './stylesWidget';
import { theme } from '../../theme';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type IFeedbackType = keyof typeof feedbackTypes;

function Widget() {
    const [ feedbackType, setFeedbackType] = useState<IFeedbackType | null >(null)
    const [ feedbackSent, setFeedbackSent] = useState<Boolean>(false)

    const bottomSheetRef = useRef<BottomSheet>(null);

    function handleOpen(){
        bottomSheetRef.current?.expand();
    }
   
    function handleFeedbackSent(){
        setFeedbackSent(true);
    }
    
    function handleRestartFeedback(){
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={handleOpen}>
                <ChatTeardropDots
                    size={24}
                    weight="bold"
                    color={theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1, 300]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >
                {
                    feedbackSent ? 
                    <Success onSendAnotherFeedback={handleRestartFeedback}/> 
                    :
                    <>
                        {
                            !feedbackType ?
                            <Options
                                onFeedbackTypeChanged={setFeedbackType}
                            />
                            :
                            <Form 
                                feedbackType={feedbackType}
                                onFeedbackSent={handleFeedbackSent}
                                onFeedbackCanceled={handleRestartFeedback}
                            /> 
                        }
                    </>
                    
                }

            </BottomSheet>
        </>
    );
}

export default gestureHandlerRootHOC(Widget);
//Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory