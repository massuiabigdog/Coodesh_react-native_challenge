import React, { ReactNode } from 'react';
import { View } from 'react-native';

interface BottomContentProps {
    children: ReactNode;
}

const BottomContent = ({ children }: BottomContentProps) => {
    return (
        <View style={{ position: 'absolute', width: '100%', bottom: 0, flex: 1, justifyContent: 'flex-end', backgroundColor: 'white' }}>
            <View style={{margin: 20, marginBottom: 30}}>
                {children}
            </View>
        </View>
    );
};

export default BottomContent;
