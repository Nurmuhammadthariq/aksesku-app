import React, { useEffect } from 'react'
import { TouchableOpacity, Text, ScrollView, View, ActivityIndicator } from 'react-native'
import { gql } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import { useKegiatanPenyuluhanContext } from '@/context/kegiatan-penyuluhan/kegiatan-penyuluhan-context';
import ImageSlider from './ImageSlider';
import HeaderPost from './HeaderPost';
import FooterPost from './FooterPost';
import { Button } from 'react-native';

const StyledScrollView = styled(ScrollView)

interface UserType {
    id: string;
    username: string;
    fullName: string;
    isAsesor: boolean | null;
    thumbnail: string;
}

export interface FeedType {
    id: string;
    jenis: number;
    date: string;
    createdAt: string;
    nama: string;
    deskripsi: string;
    linkFoto: string[];
    likes: number;
    comments: number;
    user: UserType;
    verifikasi: boolean;
    jenisMediaPenyuluhan: string | null;
    pending: boolean | null;
    tidakMemenuhiSyarat: boolean;
    statusVerifikasi: number;
    publish: boolean;
    jenisRccApi: string | null;
    bidang: string | null;
    durasi: string | null;
    namaOrganisasi: string | null;
    komunitas: string | null;
    jenisKegiatanPengembangan: string | null;
    fokusKegiatan: string | null;
}

const dataFeeds: FeedType[] = [
    {
        "id": "0672adc8-6cda-4009-93c0-21d2ece52acd",
        "jenis": 1,
        "date": "2024-08-19T17:00:00.000Z",
        "createdAt": "2024-08-29T09:14:07.123Z",
        "nama": "Sosialisasi pendidikan anti korupsi",
        "deskripsi": "Peran kepala sekolah & guru untuk menumbuhkan budaya anti korupsi",
        "linkFoto": [
            "/kegiatan-penyuluhan/aKWSiGxZGcZzcm9Nlvt42.jpg",
            "/kegiatan-penyuluhan/oaC7vIiKeJ1ueuuUCr5RG.jpg"
        ],
        "likes": 1,
        "comments": 0,
        "user": {
            "id": "ed853a13-9c95-46ea-87e2-7aff178b6824",
            "username": "3603202509810001",
            "fullName": "Deden A Rosyid",
            "isAsesor": null,
            "thumbnail": "EtcINM_0ELnIeP7pZmVlQ.j-thumb.jpg",
        },
        "verifikasi": false,
        "jenisMediaPenyuluhan": null,
        "pending": null,
        "tidakMemenuhiSyarat": false,
        "statusVerifikasi": 1,
        "publish": true,
        "jenisRccApi": null,
        "bidang": null,
        "durasi": null,
        "namaOrganisasi": null,
        "komunitas": null,
        "jenisKegiatanPengembangan": null,
        "fokusKegiatan": null,
    },
    {
        "id": "5afcd2d6-05bb-4b38-bfda-322b7901d23f",
        "jenis": 1,
        "date": "2024-06-24T17:00:00.000Z",
        "createdAt": "2024-08-29T08:27:29.082Z",
        "nama": "Executive Course Pengelolaan Keuangan Negara bagi Manajemen Pengelola Keuangan di Lingkungan Pemerintah Daerah. Badiklat Keuangan Kemenkeu RI, Surabaya 25 Juni 2024",
        "deskripsi": "Memaparkan materi berjudul Overview Korupsi, Gratifikasi dan Upaya Pencegahannya. Peserta adalah para Sekretaris Kota/Kabupaten.",
        "linkFoto": [
            "/kegiatan-penyuluhan/QwysQ_AEwkb9TKV4Bh-8_.jpg",
            "/kegiatan-penyuluhan/QuShkwya5Nw1pj2yDjrYY.jpg",
            "/kegiatan-penyuluhan/DSqDHH46kDbLpLv7-XRxM.jpg"
        ],
        "likes": 0,
        "comments": 0,
        "user": {
            "id": "23dcce3a-4aba-4415-8d56-eef290289330",
            "username": "nanang236",
            "fullName": "Nanang T. Puspito",
            "isAsesor": null,
            "thumbnail": "5vzGq97uJ_N4Mt6QtJyXg.j-thumb.jpeg",
        },
        "verifikasi": false,
        "jenisMediaPenyuluhan": null,
        "pending": null,
        "tidakMemenuhiSyarat": false,
        "statusVerifikasi": 1,
        "publish": true,
        "jenisRccApi": null,
        "bidang": null,
        "durasi": null,
        "namaOrganisasi": null,
        "komunitas": null,
        "jenisKegiatanPengembangan": null,
        "fokusKegiatan": null,
    },
    {
        "id": "be5d7082-bc83-425b-ac17-4b70c2466ba0",
        "jenis": 1,
        "date": "2024-08-27T17:00:00.000Z",
        "createdAt": "2024-09-01T00:49:05.719Z",
        "nama": "BIMBINGAN TEKNIS PERSIAPAN SERTIFIKASI CALON PENYULUH ANTIKORUPSI JENJANG PERTAMA JALUR PENGALAMAN DI LINGKUNGAN KEMENTERIAN KESEHATAN  BATCH II TAHUN 2024",
        "deskripsi": "Ceramah dan tanya jawab tentang praktik baik penyuluhan antikorupsi, manfat menjadi PAKSI, tantangan, dan strategi kolaborasi PAKSI.",
        "linkFoto": [
            "/kegiatan-penyuluhan/LrSRBcRLVwCMc4ZI2m9VN.jpeg"
        ],
        "likes": 0,
        "comments": 0,
        "user": {
            "id": "e110ea05-6ea8-4f61-a332-d5865924d355",
            "username": "zenigarut1983",
            "fullName": "Zeni Zaenal Mutaqin",
            "isAsesor": null,
            "thumbnail": "n6ySUrT_y-_FNSUy3Tak8.j-thumb.jpg",
        },
        "verifikasi": false,
        "jenisMediaPenyuluhan": null,
        "pending": null,
        "tidakMemenuhiSyarat": false,
        "statusVerifikasi": 1,
        "publish": true,
        "jenisRccApi": null,
        "bidang": null,
        "durasi": null,
        "namaOrganisasi": null,
        "komunitas": null,
        "jenisKegiatanPengembangan": null,
        "fokusKegiatan": null,
    },
    {
        "id": "2b6a6681-a875-4248-bce8-2bf95ac97b90",
        "jenis": 1,
        "date": "2024-08-31T09:23:28.958Z",
        "createdAt": "2024-08-31T09:26:40.606Z",
        "nama": "Pelatihan Pengelolaan Limbah pada UPT Dinas Kesehatan Kabupaten Ketapang",
        "deskripsi": "engetahuan mengenai anti korupsi kepada tenaga kesehatan akan menjadikan tenaga kesehatan dapat menghindari dari praktik-praktik korupsi dalam pelaksanaan tugas dan fungsi yang mereka emban",
        "linkFoto": [
            "/kegiatan-penyuluhan/R3vMHA-pnxqwSWzKSnIE_.jpeg",
            "/kegiatan-penyuluhan/Xgus_YaRWz9jjtTnIKOZO.jpeg",
            "/kegiatan-penyuluhan/GwlOt-sTzXodJPjqzXbrK.jpeg",
            "/kegiatan-penyuluhan/akEcTPqqvFdN9NmAmK7YC.jpeg",
            "/kegiatan-penyuluhan/65NzkM7Iy-0rashR0teNL.jpeg"
        ],
        "likes": 0,
        "comments": 0,
        "user": {
            "id": "edc9ed99-6713-4b13-bbf0-b217b7fc40bf",
            "username": "hariri76",
            "fullName": "sutan hariri harahap",
            "isAsesor": null,
            "thumbnail": "E_tfmPHyHuU40cihf8SAV.j-thumb.jpg",
        },
        "verifikasi": false,
        "jenisMediaPenyuluhan": null,
        "pending": null,
        "tidakMemenuhiSyarat": false,
        "statusVerifikasi": 1,
        "publish": true,
        "jenisRccApi": null,
        "bidang": null,
        "durasi": null,
        "namaOrganisasi": null,
        "komunitas": null,
        "jenisKegiatanPengembangan": null,
        "fokusKegiatan": null,
    }

]

export const GET_DATA = gql`
    query kegiatanPenyuluhanPaginateListMobile($payload: KegiatanPenyuluhanPaginateListInputType!) {
        kegiatanPenyuluhanPaginateListMobile(payload: $payload) {
            pages
            count
            data {
            id
            jenis
            date
            createdAt
            nama
            deskripsi
            linkFoto
            likes
            comments
            user {
                id
                username
                fullName
                isAsesor
                thumbnail
            }
            verifikasi
            jenisMediaPenyuluhan {
                id
                nama
            }
            pending
            tidakMemenuhiSyarat
            statusVerifikasi
            publish
            jenisRccApi
            bidang
            durasi
            namaOrganisasi
            komunitas {
                id
                nama
            }
            jenisKegiatanPengembangan
            fokusKegiatan
            }
        }
    }
`

const FeedActivity = () => {
    const { items, refetch, loading, loadMore } = useKegiatanPenyuluhanContext()

    const onLoadMore = () => {
        loadMore()
    }
    
    if (loading) {
        return (
            <View className='mt-0 mb-[35%] gap-5'>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <SafeAreaView className='mt-0 mb-[35%] gap-5'>
            {items.map((feed) => (
                <StyledScrollView key={feed.id} className='bg-[#8C63D8] rounded-xl p-4 bt'>
                    <HeaderPost header={feed} />
                    
                    <TouchableOpacity>
                        <Text className="text-white mt-2 font-PoppinsBold">
                            {feed.nama}
                        </Text>
                    </TouchableOpacity>

                    <ImageSlider images={feed.linkFoto} />

                    <FooterPost footer={feed} />
                </StyledScrollView>
            ))}
            
            <View className='mt-5'>
                <Button title='Load More' onPress={onLoadMore} />
            </View>
        </SafeAreaView>
    )
}

export default FeedActivity;