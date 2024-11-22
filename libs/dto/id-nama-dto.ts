export interface IdNamaDto {
  id: string
  /**
   * @label Nama
   * @require Masukan nama
   * @name nama
   */
  nama: string
}

export interface IdNamaUpdateDto extends IdNamaDto {}

export interface IdNamaCreateDto extends Omit<IdNamaUpdateDto, 'id'> {}