import { useState, useContext } from 'react';
import { Redirect } from 'expo-router';
import { AuthContext } from '../context';
import { ActivityIndicator } from 'react-native'


const Page = () => {
	const authContext = useContext(AuthContext)
	// @ts-ignore
	if (!authContext) {
		return <ActivityIndicator />
	}

	if (authContext.loading) {
		return <ActivityIndicator />
	}

	if (authContext.isAuthenticated) {
		return <Redirect href="/home" />
	}

	return <Redirect href="/sign-in" />
}

export default Page