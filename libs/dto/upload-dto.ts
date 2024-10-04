import { Readable } from 'stream'

export interface UploadDto {
    filename: string
    mimetype: string
    encoding: string
    /**
     * keep existing image
     */
    keep?: string
    createReadStream: () => Readable
  }