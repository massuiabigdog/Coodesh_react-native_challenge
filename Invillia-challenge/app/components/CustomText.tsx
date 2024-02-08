import React from 'react';
import { Text, ITextProps } from 'native-base';
import { colors } from '../utils';
interface CustomTextProps extends ITextProps {
    children: any;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    small?: boolean;
    bold?: boolean;
    primary?: boolean;
    neutral?: boolean;
    gray?: boolean;
    white?: boolean;
    sucess?: boolean;
}

const CustomText: React.FC<CustomTextProps> = (props) => {


    let style = {
        fontFamily: 'Poppins',
        fontSize: 14,
    }

    if (props.primary) style = {
        ...style,
        color: colors.primary,
    }
    if (props.neutral) style = {
        ...style,
        color: colors.neutral,
    }
    if (props.gray) style = {
        ...style,
        color: colors.gray,
    }
    if (props.sucess) style = {
        ...style,
        color: colors.sucess,
    }
    if (props.white) style = {
        ...style,
        color: 'white',
    }

    if (props.h1) style = {
        ...style,
        fontSize: 24,
    }
    if (props.h2) style = {
        ...style,
        fontSize: 20,
    }
    if (props.h3) style = {
        ...style,
        fontSize: 16,
    }
    if (props.small) style = {
        ...style,
        fontSize: 12,
        lineHeight: 14,
    }

    if (props.bold) style = {
        ...style,
        fontWeight: 'bold',
    }






    return <Text  {...props} {...style} >{props.children}</Text>;



};

export default CustomText;
