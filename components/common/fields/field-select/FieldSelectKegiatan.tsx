import React from 'react'
import { Select, FormControl, CheckIcon } from 'native-base'
import { Controller, useFormContext } from 'react-hook-form';

interface Option {
	label: string;
	value: number;
}

interface FieldSelectKegiatanProps {
	label?: string;
	options: Option[];
	name?: any
}
const FieldSelectKegiatan: React.FC<FieldSelectKegiatanProps> = ({
	label,
	options,
	name
}) => {
	const { control, formState: { errors } } = useFormContext()

	return (
		<FormControl w="full" className='mt-3 mb-3'>
			<FormControl.Label _text={{ color: 'white' }}>{label}</FormControl.Label>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<Select
						_selectedItem={{
							bg: "silver",
							endIcon: <CheckIcon size={5} color="emerald.500" />
						}}
						bgColor="white"
						selectedValue={value}
						onValueChange={onChange}
					>
						{options.map((option: Option) => (
							<Select.Item
								key={option.value}
								label={option.label}
								value={option.value.toString()}
							/>
						))}
					</Select>
				)}
			/>

		</FormControl>
	)
}

export default FieldSelectKegiatan