import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FeedType } from './FeedActivity'
import { TimeUtils } from '@/utils/time-utils'

const urlAkseskuApp = process.env.EXPO_PUBLIC_AKSESKU_URL_APP

interface HeaderProps {
    header: any
}

const HeaderPost = ({ header }: HeaderProps) => {
    return (
        <View className="flex-row items-center">
            <TouchableOpacity>
                <Image
                    src={`${urlAkseskuApp}private/user/${header.user.thumbnail}`}
                    className="w-10 h-10 rounded-full"
                />
            </TouchableOpacity>
            <View className="ml-4">
                <Text className="text-white font-semibold">{header.user.fullName}</Text>
                <Text className="text-gray-300 text-xs">{`@${header.user.username} - ${TimeUtils.formatDateTime(header.createdAt)}`}</Text>
            </View>
            <TouchableOpacity className="ml-auto">
                <Ionicons name="ellipsis-horizontal" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderPost