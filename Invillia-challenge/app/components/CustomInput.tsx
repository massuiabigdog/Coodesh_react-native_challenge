import React from 'react';
import { Input, Box, FormControl, WarningOutlineIcon, IInputProps } from 'native-base';

interface CustomInputProps {
    rightElement?: React.ReactElement | React.ReactElement[] | undefined;
    label: string;
    value?: string;
    isPassword?: boolean;
    placeholder?: string;
    numeric?: boolean;
    onChange: (value: string) => void; // Add onChange prop
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
    const { label, onChange, value, rightElement, isPassword, placeholder } = props;
    const handleInputChange = (value: string) => {
        onChange(value); // Call onChange prop with the updated value
    };
    return (
        <>
            <Box marginBottom={3} alignItems="center">
                <FormControl>
                    <FormControl.Label>{label}</FormControl.Label>
                    <Input keyboardType={props.numeric ? 'numeric' : 'default'} type={isPassword ? 'password' : 'text'} InputRightElement={rightElement ? <Box marginRight={2}>{rightElement}</Box> : <></>} h='44px' borderRadius='15px' placeholder={placeholder || label} value={value} onChangeText={handleInputChange} />
                </FormControl>
            </Box>

        </>
    );
};

export default CustomInput;
