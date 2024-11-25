import { JenisKegiatanEnum } from "@/libs/enum"
import { UserIdentityDto } from "../auth-dto"
import { JenisMediaPenyuluhanDto } from "./jenis-media-penyuluhan-dto"
import { StatusVerifikasiEnum } from "@/libs/enum"
import { JenisKegiatanRCCApiEnum, BidangEnum, DurasiPeriodeEnum } from "@/libs/enum"
import { ReferensiPilihanJenisKegiatanEnum } from "@/libs/enum"

export interface KegiatanPenyuluhanBriefDto {
    id: string
    jenis: JenisKegiatanEnum
    date: Date
    createdAt: Date
    nama?: string
    deskripsi: string
    linkFoto?: string[]
    likes: number
    comments: number
    user: UserIdentityDto
    verifikasi: boolean
    jenisMediaPenyuluhan?: JenisMediaPenyuluhanDto
    pending?: boolean
    tidakMemenuhiSyarat: boolean
    statusVerifikasi: StatusVerifikasiEnum
    publish?: boolean
    jenisRccApi?: JenisKegiatanRCCApiEnum
    bidang?: BidangEnum
    durasi?: DurasiPeriodeEnum
    namaOrganisasi?: string
    komunitas?: KegiatanPenyuluhanTinyDto
    jenisKegiatanPengembangan?: ReferensiPilihanJenisKegiatanEnum
    fokusKegiatan?: string
}

export interface KegiatanPenyuluhanTinyDto {
    id: string
    nama: string
}