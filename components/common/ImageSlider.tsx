import React from 'react'
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native'
import { images } from '@/constants';
import { useTailwind, styled } from 'nativewind';


import Swiper from 'react-native-swiper'

const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)

interface PropsImages {
    images: string[]
}

const urlAkseskuApp = process.env.EXPO_PUBLIC_AKSESKU_URL_APP

const ImageSlider = ({ images }: PropsImages) => {

    return (
        <StyledScrollView className='h-44'>
            <Swiper
                showsButtons={false}
                className='h-44'
                loop={false}
                dot={<StyledView className='w-2 h-2 bg-gray-400 rounded-full mx-1' />}
                activeDot={<StyledView className='w-2 h-2 bg-blue-500 rounded-full mx-1' />}
                paginationStyle={styles.paginationStyle}
            >
                {images.map((image: string, index: number) => (
                    <StyledView key={index} className='flex-1 justify-center items-center'>
                        <Image
                            src={`${urlAkseskuApp}private${image}`} // Replace with actual image
                            className="w-full h-40 rounded-lg mt-3"
                        />
                    </StyledView>
                ))}

            </Swiper>
        </StyledScrollView>
    )
}

const styles = StyleSheet.create({
    paginationStyle: {
        bottom: 15
    }
})


export default ImageSlider