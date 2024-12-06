import { useState, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ActivityIndicator,
    Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { images } from '@/constants';
import { styled } from 'nativewind';
import * as SplashScreen from 'expo-splash-screen';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CredentialDto } from '../../libs/dto/auth-dto';
import { AuthContext } from '../../context';

import { useSignInMutation } from '../../graphql';

SplashScreen.preventAutoHideAsync();
const GradientBackground = styled(LinearGradient)
const StyledSafeAreaView = styled(SafeAreaView)

const schema = Yup.object().shape({
    username: Yup.string().required('Username harus diisi'),
    password: Yup.string().required('Password harus diisi'),
})


const SignIn = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const { signIn } = useContext(AuthContext)
    const {
        control,
        handleSubmit,
        formState: { errors },

    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: '',
            password: ''
        }
    });


    const [login, { loading, error }] = useSignInMutation({
        onCompleted: e => {
            signIn(e.authSignIn.token)
        },
        onError: error => {
            console.log(error)
        },

    })

    const onSubmit = (data: CredentialDto) => {
        // console.log(data)
        login({ variables: data })
    }

    if (loading) {
        return (
            <View className='flex-1'>
                <ActivityIndicator className='justify-center h-full' size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <GradientBackground
            colors={["#3b21b7", "#8b64da", "#d195ee", "#cecbd3"]}
            locations={[0, 0.08, 0.73, 1]}
            className='flex-1'
        >
            <StyledSafeAreaView
                className=' justify-center px-8 h-full'
            >
                <Image
                    className="w-full h-40 mb-7"
                    resizeMode='center'
                    source={images.LogoAksesku}
                />

                <Text
                    className="
                        font-PoppinsBold
                        self-start 
                        mb-[36px] text-3xl tracking-tight leading-none text-white"
                >
                    Sign in
                </Text>

                {/* Input Username */}
                <View className="space-y-4 font-PoppinsRegular">
                    <View
                        className='
                            w-full 
                            pt-[11px] 
                            pl-[19px] 
                            rounded-3xl 
                            border-white 
                            border-[3px] 
                            shadow 
                            h-[53px]
                        '>
                        <Controller
                            name='username'
                            control={control}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <TextInput
                                    className="text-white text-base font-PoppinsRegular"
                                    placeholder="Masukan username disini"
                                    placeholderTextColor="white"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.username && <Text className='text-red-600 mt-2 font-bold'>{errors.username.message}</Text>}
                    </View>

                    {/* Input Password */}
                    <View
                        className="
                            w-full 
                            pt-[11px] 
                            pl-[19px] 
                            rounded-3xl 
                            border-white 
                            border-[3px] 
                            shadow 
                            h-[53px]
                        ">
                        <Controller
                            name='password'
                            control={control}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <TextInput
                                    className="text-white text-base font-PoppinsRegular"
                                    placeholder="Masukan password"
                                    secureTextEntry={true}
                                    placeholderTextColor="white"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.password && <Text className='text-red-600 mt-2 font-bold'>{errors.password.message}</Text>}
                        <TouchableOpacity className="absolute right-4 top-4">
                            <FontAwesome name="eye" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>

                    {/* Remember me and forgot password */}
                    <View className="flex-row justify-between items-center mt-4">
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => setRememberMe(!rememberMe)}
                        >
                            <View
                                className={`w-5 h-5 rounded-lg border-2 border-white mr-2 ${rememberMe ? 'bg-purple-600' : ''
                                    }`}
                            />
                            <Text className="text-sm text-white font-PoppinsRegular">Remember me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text className="text-sm font-PoppinsRegular text-purple-900">Forgot password</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Button sign in */}
                    <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-[#635A8F] rounded-full py-4 mt-6 shadow-lg">
                        <Text className="text-center text-white text-lg font-PoppinsBold">Sign in</Text>
                    </TouchableOpacity>

                    <Text className="text-center text-sm text-white mt-6 font-PoppinsRegular">Dukungan Teknis</Text>

                    <TouchableOpacity className="flex-row justify-center mt-8">
                        <Text className="text-sm text-white">

                        </Text>
                    </TouchableOpacity>
                </View>
            </StyledSafeAreaView>
        </GradientBackground>
    )
}

export default SignIn