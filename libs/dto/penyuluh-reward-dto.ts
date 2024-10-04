import { PenyuluhBriefDto } from './master'
import { RewardDto } from './reward-dto'

export interface PenyuluhRewardDto {
    id: string
    poin: number
    penyuluh: PenyuluhBriefDto
    date: Date
    reward: RewardDto
    ref?: string
    deskripsi?: string
    link?: string
}

export interface RewardSummaryDto {
    id: string
    nama: string
    value: number
    image?: string
}