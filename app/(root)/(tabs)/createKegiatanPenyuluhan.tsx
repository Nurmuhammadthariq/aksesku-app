import { images } from "@/constants"
import { LinearGradient } from "expo-linear-gradient"
import { FormProvider } from "react-hook-form"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, Image } from "react-native"
import { styled } from "nativewind"
import { Text } from "react-native"

import { FormControl, Select, CheckIcon } from "native-base"
import { KegiatanPenyuluhanForm } from "@/components/forms"
import React from "react"

const GradientBackground = styled(LinearGradient)
const StyledSafeAreaView = styled(SafeAreaView)

export default function CreateKegiatanPenyuluhan() {
    return (
        <GradientBackground
            colors={["#3b21b7", "#8b64da", "#d195ee", "#cecbd3"]}
            locations={[0, 0.08, 0.73, 1]}
            className='flex-1'
        >
            <StyledSafeAreaView
                className="justify-center h-full"
            >
                <ScrollView
                    className="px-[19px] mt-[20px] mb-[25%]"
                >
                    <Image
                        className="w-full h-40 mb-3 "
                        resizeMode="contain"
                        source={images.imageNewKegiatanPenyuluhan}
                    />

                    <Text className="text-white text-xl font-PoppinsBold">
                        Laporkan Kegiatan baru
                    </Text>

                   <KegiatanPenyuluhanForm.FieldSet/>
                </ScrollView>
            </StyledSafeAreaView>
        </GradientBackground>
    )
}
