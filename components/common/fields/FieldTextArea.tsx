import React from 'react'
import { FormControl, WarningOutlineIcon, TextArea } from 'native-base'
import { Controller, useFormContext, useWatch } from 'react-hook-form';

interface FieldTextAreaProps {
    label?: string;
    placeholder?: string;
    name: any;
    rules?: any;
}

export const FieldTextArea: React.FC<FieldTextAreaProps> = ({
    label,
    name,
    placeholder
}) => {
    const { control, formState: { errors } } = useFormContext()

    return (
        <FormControl
            w="full"
            className='mb-3'
            isInvalid={!!errors[name]}
        >
            <FormControl.Label _text={{ color: 'white' }}>{label}</FormControl.Label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextArea 
                        autoCompleteType="off" 
                        maxHeight="20"
                        placeholder={placeholder}  
                        maxW="full"
                        bgColor="white"
                        isInvalid={!!errors[name]}
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors[name] && (
                <FormControl.ErrorMessage 
                    _text={{ fontWeight: 'bold' }} 
                    leftIcon={<WarningOutlineIcon size="xs" />
                }>
                    {errors[name].message}
                </FormControl.ErrorMessage>
            )}
        </FormControl>
    )
}