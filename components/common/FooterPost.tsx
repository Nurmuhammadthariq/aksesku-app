import { View, TouchableOpacity, Image, Text, FlatList } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { images } from '@/constants';
import { FeedType } from './FeedActivity'
import { useMemo, useRef, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetModal, BottomSheetScrollView, BottomSheetFooter } from "@gorhom/bottom-sheet"

interface FooterProps {
    footer: FeedType
}

const FooterPost = ({ footer }: FooterProps) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['70%', '100%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderFooter = useCallback(
        (props: any) => (
          <BottomSheetFooter {...props} bottomInset={2}>
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Footer</Text>
            </View>
          </BottomSheetFooter>
        ),
        []
      );
    return (
        <View className="flex-row justify-between mt-2">
            <View className="flex-row items-center mr-2">
                <TouchableOpacity className="mr-2">
                    <FontAwesome name="heart" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white">{footer.likes}</Text>
            </View>
            <View className="flex-row items-center">
                <TouchableOpacity onPress={handlePresentModalPress} className="mr-2">
                    <FontAwesome name="comment" size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white">{footer.comments}</Text>
            </View>
            <TouchableOpacity className="ml-auto">
                <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{ backgroundColor: '#6D4ACD', opacity: 0.9 }}
                handleIndicatorStyle={{ backgroundColor: '#fff' }}
                footerComponent={renderFooter}
            >
                <BottomSheetScrollView style={{ padding: 10 }}>
                    <View style={styles.commentContainer}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={images.userComment}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.commentContent}>
                            <Text className='font-PoppinsBold text-[#6D4ACD] text-[14px]'>Rezi Rahardianor</Text>
                            <Text className='font-PoppinsMedium text-[#6D4ACD] text-[11px]'>@reziR · 2024/9/12</Text>
                            <Text className='font-PoppinsMedium text-[#6D4ACD] text-[13px]'>ForPAK Papua Manyala ! Andalan</Text>
                        </View>
                    </View>
                    <View style={styles.commentContainer}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={images.userComment}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.commentContent}>
                            <Text className='font-PoppinsBold text-[#6D4ACD] text-[14px]'>Rezi Rahardianor</Text>
                            <Text className='font-PoppinsMedium text-[#6D4ACD] text-[11px]'>@reziR · 2024/9/12</Text>
                            <Text className='font-PoppinsMedium text-[#6D4ACD] text-[13px]'>ForPAK Papua Manyala ! Andalan</Text>
                        </View>
                    </View>
                    <View style={styles.commentContainer}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={images.userComment}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.commentContent}>
                            <Text className='font-PoppinsBold text-[#6D4ACD] text-[14px]'>Rezi Rahardianor</Text>
                            <Text className='font-PoppinsMedium text-[#6D4ACD] text-[11px]'>@reziR · 2024/9/12</Text>
                            <Text className='font-PoppinsMedium text-[#6D4ACD] text-[13px]'>ForPAK Papua Manyala ! Andalan</Text>
                            <Image
                                source={images.imageComment}
                                style={styles.commentImage}
                            />
                        </View>
                    </View>
                </BottomSheetScrollView>
            </BottomSheetModal>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    commentContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    avatarContainer: {
        paddingRight: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    commentContent: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 17.96
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    username: {
        color: '#555',
        fontSize: 12,
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
    },
    commentImage: {
        marginTop: 10,
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    listContent: {
        paddingBottom: 20,
    },
    footerContainer: {
        padding: 12,
        margin: 12,
        marginBottom: 0,
        borderRadius: 12,
        backgroundColor: '#fff',
      },
      footerText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '800',
      },
});

export default FooterPost