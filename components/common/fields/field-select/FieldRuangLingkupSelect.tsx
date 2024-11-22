import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { useStaticDataContext } from "@/context/static-data-context"

import { Select, FormControl, CheckIcon, WarningOutlineIcon } from 'native-base'
import { IdNamaDto } from "@/libs/dto";

interface FieldRuangLingkupSelectProps {
    label?: string;
    name?: any;
}
const FieldRuangLingkupSelect = ({
    label,
    name
}: FieldRuangLingkupSelectProps) => {
    const { ruangLingkupList } = useStaticDataContext()
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
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <Select
                        bgColor="white"
                        selectedValue={value}
                        onValueChange={onChange}
                        _selectedItem={{
                            bg: "silver",
                            endIcon: <CheckIcon size={5} color="emerald.500" />
                        }}
                    >
                        {ruangLingkupList.map((ruangLingkup: IdNamaDto) => (
                            <Select.Item
                                key={ruangLingkup.id}
                                label={ruangLingkup.nama}
                                value={ruangLingkup.id}
                            />
                        ))}
                    </Select>
                )}
            />
            {errors[name] && (
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors[name].message}
                </FormControl.ErrorMessage>
            )}
        </FormControl>
    )
}

export default FieldRuangLingkupSelect