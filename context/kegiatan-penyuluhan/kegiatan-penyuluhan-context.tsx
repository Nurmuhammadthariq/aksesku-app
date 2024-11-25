import React, { useEffect, useState, PropsWithChildren, useContext } from "react";
import { useKegiatanPenyuluhanPaginateListMobileQuery } from "@/graphql";
import { useQuery } from '@apollo/client';
import { useImmer } from 'use-immer'
import { GET_DATA, FeedType } from "@/components/common/FeedActivity";
import { KegiatanPenyuluhanBriefDto } from "@/libs/dto/master/kegiatan-penyuluhan-dto";
import { GraphQLLoadMoreUtils } from "@/utils";

export interface KegiatanPenyuluhanContextValue {
    refetch: () => void;
    items: KegiatanPenyuluhanBriefDto[];
    loading: boolean;
    loadMore: () => void
    fetchMore: () => void
}

export const KegiatanPenyuluhanContext =
    React.createContext<KegiatanPenyuluhanContextValue>({} as any)

const pageSize = 3
export const KegiatanPenyuluhanContextProvider = ({ children }: PropsWithChildren) => {
    const [kegiatanPenyuluhan, setKegiatanPenyuluhan] = useState<KegiatanPenyuluhanBriefDto[]>([])
    const currentPage = React.useRef(0)
    const [{ fetching, hasNextPage, items }, update] = useImmer({
        fetching: false,
        hasNextPage: true,
        items: [] as any
    })
    const { data, fetchMore, refetch, loading } =
        useKegiatanPenyuluhanPaginateListMobileQuery({
            variables: {
                payload: {
                    filtered: [],
                    page: 0,
                    pageSize,
                    sorted: [],
                    isApi: false,
                    search: ''
                }
            },
            fetchPolicy: "cache-and-network",
            onCompleted: e => {
                update(s => {
                    const lastPage = e?.kegiatanPenyuluhanPaginateListMobile?.pages - 1
                    console.log(lastPage, 'lastPage')
                    s.hasNextPage = true
                    s.fetching = false
                    currentPage.current = 0
                    s.items = e?.kegiatanPenyuluhanPaginateListMobile.data
                })
            }
        })

    // console.log(fetching, 'fetching')
    const loadMore = async () => {

        update(s => {
            s.fetching = true
        })
        const { data } = await fetchMore({
            variables: {
                payload: {
                    filtered: [],
                    page: currentPage.current + 1,
                    pageSize,
                    sorted: [],
                    isApi: false,
                    search: ''
                }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                const newData = fetchMoreResult.kegiatanPenyuluhanPaginateListMobile.data
                update(s => {
                    s.items = [...prev.kegiatanPenyuluhanPaginateListMobile.data, ...newData]
                })
                return {
                    ...prev,
                    kegiatanPenyuluhanPaginateListMobile: {
                        ...prev.kegiatanPenyuluhanPaginateListMobile,
                        data: [...prev.kegiatanPenyuluhanPaginateListMobile.data, ...newData]
                    }
                }
            }
        })
        currentPage.current += 1
    }

    return (
        <KegiatanPenyuluhanContext.Provider value={{
            items, refetch, loading, loadMore, fetchMore() {

            },
        }}>
            {children}
        </KegiatanPenyuluhanContext.Provider>
    )
}

export const useKegiatanPenyuluhanContext = () => React.useContext(KegiatanPenyuluhanContext)