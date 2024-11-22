import React from 'react'
import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import { Controller, useFormContext } from 'react-hook-form';

interface FieldInputProps {
    label?: string;
    placeholder?: string;
    name: any;
    rules?: any;
}
const FieldInput: React.FC<FieldInputProps> = ({
    label, name
}): JSX.Element => {
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
                    <Input
                        placeholder="Silahkan tulis nama disini"
                        value={value}
                        onChangeText={onChange}
                        bgColor="white"
                    // isInvalid={!!errors[name]}
                    />
                )}
            />
            {errors[name] && (
                <FormControl.ErrorMessage
                    _text={{ fontWeight: 'bold' }}
                    leftIcon={<WarningOutlineIcon size="xs" />}
                >
                    {errors[name].message}
                </FormControl.ErrorMessage>
            )}
        </FormControl>
    )
}

export default FieldInput