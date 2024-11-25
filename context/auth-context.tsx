import { UserIdentityDto, PenyuluhDto } from "../libs/dto";
import { router } from 'expo-router'
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from 'jsonwebtoken'
import JWT from 'expo-jwt'
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, type PropsWithChildren, useContext } from "react";
import { useImmer } from 'use-immer'
import { setToken, getItem, removeToken } from '../utils'


export interface AuthContextValue {
    user?: UserIdentityDto
    loading: boolean
    signIn(token?: string): void
    signOut?(): void
    penyuluh?: PenyuluhDto
    updatePenyuluh?(): void
    state:  {
        user?: UserIdentityDto;
        loading: boolean;
        penyuluh?: PenyuluhDto;
    }
    isAuthenticated?: boolean,
    token?: string | null
}

export const AuthContext = React.createContext<AuthContextValue>({} as AuthContextValue)

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const hasToken = !getItem()
    const [state, update] = useImmer<{
        user?: UserIdentityDto 
        loading: boolean
        penyuluh?: PenyuluhDto,
        token: null | string,
        isAuthenticated: boolean
    }>({
        loading: true,
        isAuthenticated: false,
        token: null
    });
    const { user, loading, penyuluh, token, isAuthenticated } = state;

    useEffect(() => {
        (async () => {
            const token = await getItem()
            if (token) {
                const res: any = decodeToken(token)
                update(s => {
                    s.user = res
                    s.loading = false
                    s.token = token
                    s.isAuthenticated = true
                })
            } else {
                update(s => {
                    s.loading = false
                })
            }
        })()
    }, [])

   
    
    const signIn = (token: string) => {
        setToken(token)
        console.log('this is function sign in')
        const res: any = decodeToken(token)
        // console.log(res)
        
        update(s => {
            s.user = res
            s.loading = true
        })
        router.replace('/(root)/(tabs)/home')
    }

    const signOut = () => {
        removeToken()
        update(s => {
            s.loading = false
        })
        router.replace('/sign-in')
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, penyuluh, signIn, state, token, isAuthenticated, signOut}}
        >
            {children}
        </AuthContext.Provider>
    )
}
function decodeToken(token: string) {
    const payload = jwtDecode(token)
    return payload
}
