import { IdNamaDto, JenisMediaPenyuluhanDto, SasaranDto } from "@/libs/dto";
import React, { useState, createContext, useContext, PropsWithChildren } from "react";
import { useStaticDataQuery } from "@/graphql";
import { ActivityIndicator } from "react-native";
import { setStaticData } from "@/utils";

interface StaticDataContextValue {
	jenisMediaPenyuluhanList: JenisMediaPenyuluhanDto[];
	sasaranList: SasaranDto[];
	ruangLingkupList: IdNamaDto[];
}

export const StaticDataContext = createContext<StaticDataContextValue>(
	{} as any
)

export const StaticDataContextProvider = ({ children }: PropsWithChildren) => {
	const [value, setValue] = useState<StaticDataContextValue>({} as any)
	
	const { loading, data } = useStaticDataQuery({
		onCompleted: val => {
			setValue(val)
			setStaticData(val)
		}
	})

	return (
		<StaticDataContext.Provider value={value}>
			{loading ? <ActivityIndicator /> : children}
		</StaticDataContext.Provider>
	)
}

export const useStaticDataContext = () => useContext(StaticDataContext)