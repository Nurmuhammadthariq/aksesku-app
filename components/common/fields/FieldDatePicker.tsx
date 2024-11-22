import React, { useState, useCallback } from 'react'
import { DatePickerModal, id } from "react-native-paper-dates"
import { FormControl, Input, WarningOutlineIcon } from 'native-base'
import { View, TextInput, Button } from 'react-native'
import { Controller, useFormContext } from 'react-hook-form';

interface FieldDatePickerProps {
    label?: string;
    placeholder?: string;
    name?: any;
    rules?: any;
}

export const FieldDatePicker: React.FC<FieldDatePickerProps> = ({
    label,
    name
}) => {
    const [open, setOpen] = useState(false)
    const { control, formState: { errors } } = useFormContext()

    const onDismissSingle = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    // const onConfirmSingle = React.useCallback(
    //     (params) => {
    //         setOpen(false);
    //         setDate(params.date);
    //     },
    //     [setOpen, setDate]
    // );



    return (
        <FormControl
            w="full"
            className='mb-3'
        >
            <FormControl.Label _text={{ color: 'white' }}>{label}</FormControl.Label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    const date = value ? new Date(value).toLocaleDateString() : ''
                    return (
                        <>
                            <DatePickerModal
                                visible={open}
                                onDismiss={onDismissSingle}
                                onConfirm={(date: any) => {
                                    onChange(date.date);
                                    setOpen(false);
                                }}
                                date={value}
                                mode='single'
                                locale='en'
                            />
    
                            <View className="flex-row pl-3 pr-3 pt-2 pb-2 bg-white justify-between">
                                <TextInput
                                    value={date}
                                />
    
                                <Button
                                    title="Callendar"
                                    onPress={() =>
                                        setOpen(true)}
                                    color="black"
    
                                />
                            </View>
    
                        </>
    
    
    
                    )
                }}
            />
        </FormControl>
    )
}