import React from 'react';
import { TouchableOpacity } from 'react-native';
import CustomText from './CustomText';

type LinkProps  = {
    onPress: () => void;
    children: React.ReactNode;
    primary?: boolean;
};

const CustomLink: React.FC<LinkProps> = ({ onPress, children, primary }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <CustomText bold gray={!primary} primary={primary} >{children}</CustomText>
        </TouchableOpacity>
    );
};

export default CustomLink;
