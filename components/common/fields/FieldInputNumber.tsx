import React from 'react'
import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import { TextInput } from 'react-native'
import { Controller, useFormContext } from 'react-hook-form';

interface FieldInputNumber {
    label?: string;
    placeholder?: string;
    name?: any;
}

export const FieldInputNumber: React.FC<FieldInputNumber> = ({
    label,
    name
}): JSX.Element => {
    const { control, formState: { errors } } = useFormContext()

    return (
        <FormControl
            w="full"
            className='mb-3'
        >
            <FormControl.Label _text={{ color: 'white' }}>{label}</FormControl.Label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        value={value.toString()}
                        keyboardType='numeric'
                        onChangeText={onChange}
                        className='bg-white h-10 pl-2 rounded'
                    />

                )}
            />
        </FormControl>
    )
}
