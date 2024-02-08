import { View } from 'native-base';
import React from 'react';

interface MainContainerProps {
    children: React.ReactNode;
    isInternalScreen?: boolean;
}

const MainContainer: React.FC<MainContainerProps> = ({ children, isInternalScreen }) => {
    return (
        <View borderTopRadius={isInternalScreen ? 0 : 30} zIndex={99} height='auto' marginTop={isInternalScreen ? 0 : -10} bg='white' p='25px'>
            {children}
        </View>
    );
};

export default MainContainer;