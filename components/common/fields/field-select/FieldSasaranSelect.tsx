import React, { useEffect, useMemo, useState } from 'react'
import { IdNamaDto, SasaranDto } from '@/libs/dto';
import { Select, FormControl, CheckIcon, View, WarningOutlineIcon } from 'native-base'
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useSasaranListByRuangLingkupQuery } from '@/graphql';

interface FieldSasaranSelectProps {
    label?: string;
    name?: any;
}

export const FieldSasaranSelect = ({ label, name }: FieldSasaranSelectProps) => {
    const [list, setList] = useState<SasaranDto[]>([]);
    const { control, formState: { errors } } = useFormContext();
    const ruangLingkup = useWatch({ control, name: 'ruangLingkupId' });

    const { refetch, loading } = useSasaranListByRuangLingkupQuery({
        fetchPolicy: 'cache-and-network',
        variables: { id: ruangLingkup },
        onCompleted: e => {
            setList([...e?.sasaranListByRuangLingkup])
        }
    })


    const options = useMemo<SasaranDto[]>(() => {

        if (!ruangLingkup || !list) {
            return []
        }    
        
        return list.filter(s => s.ruangLingkup.id === ruangLingkup)

    }, [list, ruangLingkup, refetch])
    // console.log(options)

  return (
    <View>
        <FormControl 
            w="full" 
            className='mb-3'
            isInvalid={!!errors[name]}
            isDisabled={!ruangLingkup ? true : false}
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
                        {options.map((sasaran: SasaranDto) => (
                            <Select.Item
                                key={sasaran.id}
                                label={sasaran.nama}
                                value={sasaran.id}
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
    </View>
  )
}
