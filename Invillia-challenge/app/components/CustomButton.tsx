import React from 'react';
import { Button, IButtonProps } from 'native-base';
import { colors } from '../utils';

interface CustomButtonProps extends IButtonProps {
    disabled?: boolean;
    primary?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const { disabled, primary, ...rest } = props;
    if (primary) {
        return <Button
            _text={{ color: 'white', fontWeight: '500', fontSize: 16, fontFamily: 'Poppins' }}
            bg={colors.primary}
            marginTop={8}
            borderRadius={15}
            _pressed={{ opacity: 0.7 }}
            isDisabled={props.disabled}
            {...props}  
        />;
    }

    return <Button isDisabled={props.disabled} {...props} />;
};

export default CustomButton;
