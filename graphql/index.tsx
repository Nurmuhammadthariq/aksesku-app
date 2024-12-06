import * as Apollo from '@apollo/client'
import { gql } from '@apollo/client'
import { CacheOperation } from 'offix-client'
import { MutationHookOptions, useOfflineMutation } from 'react-offix-hooks'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
{ [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
{ [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any
  IntString: any
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
  /** Represents NULL values */
  Void: any
}

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export const SignInDocument = gql`
  mutation signIn($username: String!, $password: String!) {
    authSignIn(credential: { username: $username, password: $password }) {
      token
    }
  }
`
export type SignInMutationFn = Apollo.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options
  )
}

export type SignInMutation = { __typename?: 'Mutation' } & {
  authSignIn: { __typename?: 'LoginResultObjectType' } & Pick<
    LoginResultObjectType,
    'token'
  >
}

export type SignInMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginResultObjectType = {
  __typename?: 'LoginResultObjectType'
  token: Scalars['String']
}

/**
 * __useStaticDataQuery__
 *
 * To run a query within a React component, call `useStaticDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaticDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaticDataQuery({
 *   variables: {
 *   },
 * });
 */
export const StaticDataDocument = gql`
  query staticData {
    sasaranList {
      id
      nama
      ruangLingkup {
        id
        nama
      }
    }
    ruangLingkupList {
      id
      nama
    }
    jenisMediaPenyuluhanList {
      id
      nama
    }
  }
`

export type IdNamaObjectType = {
  __typename?: 'IdNamaObjectType'
  id: Scalars['String']
  nama: Scalars['String']
}

export type JenisMediaPenyuluhanObjectType = {
  __typename?: 'JenisMediaPenyuluhanObjectType'
  id: Scalars['String']
  nama: Scalars['String']
}
export type SasaranObjectType = {
  __typename?: 'SasaranObjectType'
  id: Scalars['String']
  nama: Scalars['String']
  ruangLingkup: IdNamaObjectType
}

export type UserIdentityObjectType = {
  __typename?: 'UserIdentityObjectType'
  id: Scalars['String']
  username: Scalars['String']
  fullName: Scalars['String']
  isAsesor?: Maybe<Scalars['Boolean']>
  thumbnail?: Maybe<Scalars['String']>
}

export type KegiatanPenyuluhanTinyObjectType = {
  __typename?: 'KegiatanPenyuluhanTinyObjectType'
  id: Scalars['String']
  nama: Scalars['String']
}

export type LinkInputType = {
  url?: Maybe<Scalars['String']>
  deskripsi?: Maybe<Scalars['String']>
}

export type KegiatanPenyuluhanBriefObjectType = {
  __typename?: 'KegiatanPenyuluhanBriefObjectType'
  id: Scalars['String']
  jenis: Scalars['Int']
  date: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  nama?: Maybe<Scalars['String']>
  deskripsi: Scalars['String']
  linkFoto?: Maybe<Array<Scalars['String']>>
  likes: Scalars['Float']
  comments: Scalars['Float']
  user: UserIdentityObjectType
  verifikasi: Scalars['Boolean']
  jenisMediaPenyuluhan?: Maybe<JenisMediaPenyuluhanObjectType>
  pending?: Maybe<Scalars['Boolean']>
  tidakMemenuhiSyarat: Scalars['Boolean']
  statusVerifikasi: Scalars['Int']
  publish?: Maybe<Scalars['Boolean']>
  jenisRccApi?: Maybe<Scalars['Int']>
  bidang?: Maybe<Scalars['Int']>
  durasi?: Maybe<Scalars['Int']>
  namaOrganisasi?: Maybe<Scalars['String']>
  komunitas?: Maybe<KegiatanPenyuluhanTinyObjectType>
  jenisKegiatanPengembangan?: Maybe<Scalars['Int']>
  fokusKegiatan?: Maybe<Scalars['String']>
}

export type StaticDataQueryVariables = Exact<{ [key: string]: never }>

export type StaticDataQuery = { __typename?: 'Query' } & {
  sasaranList: Array<
    { __typename?: 'SasaranObjectType' } & Pick<
      SasaranObjectType,
      'id' | 'nama'
    > & {
      ruangLingkup: { __typename?: 'IdNamaObjectType' } & Pick<
        IdNamaObjectType,
        'id' | 'nama'
      >
    }
  >
  ruangLingkupList: Array<
    { __typename?: 'IdNamaObjectType' } & Pick<IdNamaObjectType, 'id' | 'nama'>
  >
  jenisMediaPenyuluhanList: Array<
    { __typename?: 'JenisMediaPenyuluhanObjectType' } & Pick<
      JenisMediaPenyuluhanObjectType,
      'id' | 'nama'
    >
  >
}

export function useStaticDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    StaticDataQuery,
    StaticDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<StaticDataQuery, StaticDataQueryVariables>(
    StaticDataDocument,
    options
  )
}

/**
 * __useSasaranListByRuangLingkupQuery__
 *
 * To run a query within a React component, call `useSasaranListByRuangLingkupQuery` and pass it any options that fit your needs.
 * When your component renders, `useSasaranListByRuangLingkupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSasaranListByRuangLingkupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */

export const SasaranListByRuangLingkupDocument = gql`
  query sasaranListByRuangLingkup($id: String) {
    sasaranListByRuangLingkup(id: $id) {
      id
      nama
      ruangLingkup {
        id
        nama
      }
    }
  }
`

export type SasaranListByRuangLingkupQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>
}>

export type SasaranListByRuangLingkupQuery = { __typename?: 'Query' } & {
  sasaranListByRuangLingkup: Array<
    { __typename?: 'SasaranObjectType' } & Pick<
      SasaranObjectType,
      'id' | 'nama'
    > & {
      ruangLingkup: { __typename?: 'IdNamaObjectType' } & Pick<
        IdNamaObjectType,
        'id' | 'nama'
      >
    }
  >
}
export function useSasaranListByRuangLingkupQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SasaranListByRuangLingkupQuery,
    SasaranListByRuangLingkupQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    SasaranListByRuangLingkupQuery,
    SasaranListByRuangLingkupQueryVariables
  >(SasaranListByRuangLingkupDocument, options)
}

export type KegiatanPenyuluhanUpsertMutation = { __typename?: 'Mutation' } & {
  kegiatanPenyuluhanUpsert: {
    __typename?: 'KegiatanPenyuluhanBriefObjectType'
  } & Pick<
    KegiatanPenyuluhanBriefObjectType,
    | 'id'
    | 'jenis'
    | 'date'
    | 'createdAt'
    | 'nama'
    | 'deskripsi'
    | 'linkFoto'
    | 'likes'
    | 'comments'
    | 'verifikasi'
    | 'pending'
    | 'tidakMemenuhiSyarat'
    | 'statusVerifikasi'
    | 'publish'
    | 'jenisRccApi'
    | 'bidang'
    | 'durasi'
    | 'namaOrganisasi'
    | 'jenisKegiatanPengembangan'
    | 'fokusKegiatan'
  > & {
    user: { __typename?: 'UserIdentityObjectType' } & Pick<
      UserIdentityObjectType,
      'id' | 'username' | 'fullName' | 'isAsesor' | 'thumbnail'
    >
    jenisMediaPenyuluhan?: Maybe<
      { __typename?: 'JenisMediaPenyuluhanObjectType' } & Pick<
        JenisMediaPenyuluhanObjectType,
        'id' | 'nama'
      >
    >
    komunitas?: Maybe<
      { __typename?: 'KegiatanPenyuluhanTinyObjectType' } & Pick<
        KegiatanPenyuluhanTinyObjectType,
        'id' | 'nama'
      >
    >
  }
}

export type KegiatanPenyuluhanUpdateInputType = {
  dokumenLaporanFile?: Maybe<Array<Scalars['Upload']>>
  linkFoto?: Maybe<Array<Scalars['String']>>
  files?: Maybe<Array<Scalars['Upload']>>
  logoKomunitasFile?: Maybe<Scalars['Upload']>
  ruangLingkupId: Scalars['String']
  targetSasaranId: Scalars['String']
  verifikasi?: Maybe<Scalars['Boolean']>
  tidakMemenuhiSyarat?: Maybe<Scalars['Boolean']>
  jenisMediaPenyuluhanId?: Maybe<Scalars['String']>
  cakupan?: Maybe<Array<Scalars['String']>>
  komunitasId?: Maybe<Scalars['String']>
  komunitasFounders?: Maybe<Array<Scalars['String']>>
  id: Scalars['String']
  jenis: Scalars['Int']
  date: Scalars['DateTime']
  nama?: Maybe<Scalars['String']>
  deskripsi: Scalars['String']
  tujuan: Scalars['String']
  jumlahPeserta?: Maybe<Scalars['Float']>
  linkVideo?: Maybe<Array<LinkInputType>>
  linkData?: Maybe<Array<LinkInputType>>
  logoKomunitas?: Maybe<Scalars['String']>
  taglineKomunitas?: Maybe<Scalars['String']>
  alasanTidakMemenuhiSyarat?: Maybe<Scalars['String']>
  tindakLanjut?: Maybe<Scalars['String']>
  linkPortofolio?: Maybe<Scalars['String']>
  tahunPelaksanaanMonitoring?: Maybe<Scalars['String']>
  lembagaPelaksanaProgramMonitoring?: Maybe<Scalars['String']>
  rentangTahunPelaksanaanProgram?: Maybe<Scalars['String']>
  instrumenMonitoring?: Maybe<Scalars['String']>
  laporanHasilMonitoring?: Maybe<Scalars['String']>
  dokumenLaporan?: Maybe<Array<Scalars['String']>>
  dokumenLaporanPublish?: Maybe<Array<Scalars['Boolean']>>
  publish?: Maybe<Scalars['Boolean']>
  jenisRccApi?: Maybe<Scalars['Int']>
  bidang?: Maybe<Scalars['Int']>
  durasi?: Maybe<Scalars['Int']>
  namaOrganisasi?: Maybe<Scalars['String']>
  fokusKegiatan?: Maybe<Scalars['String']>
  isPendiri?: Maybe<Scalars['Boolean']>
  peran?: Maybe<Scalars['Int']>
  jenisKegiatanPengembangan?: Maybe<Scalars['Int']>
  tanggalPelaksanaanKegiatan?: Maybe<Scalars['DateTime']>
  buktiPendukungFile?: Maybe<Scalars['Upload']>
  buktiPendukung?: Maybe<Scalars['String']>
}

export const KegiatanPenyuluhanPaginateListDocument = gql`
  query kegiatanPenyuluhanPaginateList($payload: PaginateRequestInputType!) {
    kegiatanPenyuluhanPaginateList(payload: $payload) {
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

export const KegiatanPenyuluhanUpsertDocument = gql`
  mutation kegiatanPenyuluhanUpsert($data: KegiatanPenyuluhanUpdateInputType!) {
    kegiatanPenyuluhanUpsert(data: $data) {
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
`

export type KegiatanPenyuluhanUpsertMutationVariables = Exact<{
  data: KegiatanPenyuluhanUpdateInputType
}>

// export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
//   const options = { ...defaultOptions, ...baseOptions }
//   return Apollo.useMutation<SignInMutation, SignInMutationVariables>(
//     SignInDocument,
//     options
//   )
// }

export function useKegiatanPenyuluhanUpsertOfflineMutation(baseOptions?: Apollo.MutationHookOptions<
  KegiatanPenyuluhanUpsertMutation,
  KegiatanPenyuluhanUpsertMutationVariables
>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<KegiatanPenyuluhanUpsertMutation, KegiatanPenyuluhanUpsertMutationVariables>(
    KegiatanPenyuluhanUpsertDocument,
    options
  )
}


/**
 * __useKegiatanPenyuluhanPaginateListMobileQuery__
 *
 * To run a query within a React component, call `useKegiatanPenyuluhanPaginateListMobileQuery` and pass it any options that fit your needs.
 * When your component renders, `useKegiatanPenyuluhanPaginateListMobileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKegiatanPenyuluhanPaginateListMobileQuery({
 *   variables: {
 *      payload: // value for 'payload'
 *   },
 * });
 */

export type PaginateSortedParamInputType = {
  id: Scalars['String']
  desc?: Maybe<Scalars['Boolean']>
}

export type PaginateFilterParamInputType = {
  id: Scalars['String']
  value: Scalars['IntString']
}

export type KegiatanPenyuluhanPaginateListInputType = {
  isApi?: Maybe<Scalars['Boolean']>
  page: Scalars['Float']
  pageSize: Scalars['Float']
  sorted: Array<PaginateSortedParamInputType>
  filtered: Array<PaginateFilterParamInputType>
  search?: Maybe<Scalars['String']>
}

export type PaginateResponseKegiatanPenyuluhanBriefObjectType = {
  __typename?: 'PaginateResponseKegiatanPenyuluhanBriefObjectType'
  pages: Scalars['Float']
  count: Scalars['Float']
  data: Array<KegiatanPenyuluhanBriefObjectType>
}

export type KegiatanPenyuluhanPaginateListMobileQueryVariables = Exact<{
  payload: KegiatanPenyuluhanPaginateListInputType
}>
export type KegiatanPenyuluhanPaginateListMobileQuery = {
  __typename?: 'Query'
} & {
  kegiatanPenyuluhanPaginateListMobile: {
    __typename?: 'PaginateResponseKegiatanPenyuluhanBriefObjectType'
  } & Pick<
    PaginateResponseKegiatanPenyuluhanBriefObjectType,
    'pages' | 'count'
  > & {
    data: Array<
      { __typename?: 'KegiatanPenyuluhanBriefObjectType' } & Pick<
        KegiatanPenyuluhanBriefObjectType,
        | 'id'
        | 'jenis'
        | 'date'
        | 'createdAt'
        | 'nama'
        | 'deskripsi'
        | 'linkFoto'
        | 'likes'
        | 'comments'
        | 'verifikasi'
        | 'pending'
        | 'tidakMemenuhiSyarat'
        | 'statusVerifikasi'
        | 'publish'
        | 'jenisRccApi'
        | 'bidang'
        | 'durasi'
        | 'namaOrganisasi'
        | 'jenisKegiatanPengembangan'
        | 'fokusKegiatan'
      > & {
        user: { __typename?: 'UserIdentityObjectType' } & Pick<
          UserIdentityObjectType,
          'id' | 'username' | 'fullName' | 'isAsesor' | 'thumbnail'
        >
        jenisMediaPenyuluhan?: Maybe<
          { __typename?: 'JenisMediaPenyuluhanObjectType' } & Pick<
            JenisMediaPenyuluhanObjectType,
            'id' | 'nama'
          >
        >
        komunitas?: Maybe<
          { __typename?: 'KegiatanPenyuluhanTinyObjectType' } & Pick<
            KegiatanPenyuluhanTinyObjectType,
            'id' | 'nama'
          >
        >
      }
    >
  }
}

export const KegiatanPenyuluhanPaginateListMobileDocument = gql`
  query kegiatanPenyuluhanPaginateListMobile(
    $payload: KegiatanPenyuluhanPaginateListInputType!
  ) {
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

export function useKegiatanPenyuluhanPaginateListMobileQuery(
  baseOptions: Apollo.QueryHookOptions<
    KegiatanPenyuluhanPaginateListMobileQuery,
    KegiatanPenyuluhanPaginateListMobileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    KegiatanPenyuluhanPaginateListMobileQuery,
    KegiatanPenyuluhanPaginateListMobileQueryVariables
  >(KegiatanPenyuluhanPaginateListMobileDocument, options)
}


/**
 * __usePenyuluhGetPenyuluhByUserIdQuery__
 *
 * To run a query within a React component, call `usePenyuluhGetPenyuluhByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePenyuluhGetPenyuluhByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePenyuluhGetPenyuluhByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export type KabupatenObjectType = {
  __typename?: 'KabupatenObjectType'
  provinsi: IdNamaObjectType
  id: Scalars['String']
  nama: Scalars['String']
}

export type RewardSummaryObjectType = {
  __typename?: 'RewardSummaryObjectType'
  id: Scalars['String']
  nama: Scalars['String']
  value: Scalars['Float']
  image?: Maybe<Scalars['String']>
}

export type PenyuluhObjectType = {
  __typename?: 'PenyuluhObjectType'
  id: Scalars['String']
  nik?: Maybe<Scalars['String']>
  nsp?: Maybe<Scalars['String']>
  nama: Scalars['String']
  jenjang?: Maybe<Scalars['Int']>
  institusi?: Maybe<Scalars['String']>
  profesi?: Maybe<Scalars['String']>
  alamat?: Maybe<Scalars['String']>
  kabupaten?: Maybe<KabupatenObjectType>
  provinsi?: Maybe<IdNamaObjectType>
  email?: Maybe<Scalars['String']>
  handphone?: Maybe<Scalars['String']>
  username: Scalars['String']
  totalPoin: Scalars['Float']
  tempatLahir?: Maybe<Scalars['String']>
  tanggalLahir?: Maybe<Scalars['DateTime']>
  jenisKelamin?: Maybe<Scalars['Int']>
  pendidikanTerakhir?: Maybe<Scalars['Int']>
  thumbnail?: Maybe<Scalars['String']>
  image?: Maybe<Scalars['String']>
  imageFile?: Maybe<Scalars['Upload']>
  rewards: Array<RewardSummaryObjectType>
}

export type PenyuluhGetPenyuluhByUserIdQueryVariables = Exact<{
  userId: Scalars['String']
}>


export type PenyuluhGetPenyuluhByUserIdQuery = { __typename?: 'Query' } & {
  penyuluhGetPenyuluhByUserId: { __typename?: 'PenyuluhObjectType' } & Pick<
    PenyuluhObjectType,
    | 'id'
    | 'nik'
    | 'nsp'
    | 'nama'
    | 'jenjang'
    | 'institusi'
    | 'profesi'
    | 'alamat'
    | 'email'
    | 'handphone'
    | 'username'
    | 'totalPoin'
    | 'tempatLahir'
    | 'tanggalLahir'
    | 'jenisKelamin'
    | 'pendidikanTerakhir'
    | 'thumbnail'
    | 'image'
    | 'imageFile'
  > & {
      kabupaten?: Maybe<
        { __typename?: 'KabupatenObjectType' } & Pick<
          KabupatenObjectType,
          'id' | 'nama'
        > & {
            provinsi: { __typename?: 'IdNamaObjectType' } & Pick<
              IdNamaObjectType,
              'id' | 'nama'
            >
          }
      >
      provinsi?: Maybe<
        { __typename?: 'IdNamaObjectType' } & Pick<
          IdNamaObjectType,
          'id' | 'nama'
        >
      >
      rewards: Array<
        { __typename?: 'RewardSummaryObjectType' } & Pick<
          RewardSummaryObjectType,
          'id' | 'nama' | 'value' | 'image'
        >
      >
    }
}

export const PenyuluhGetPenyuluhByUserIdDocument = gql`
  query penyuluhGetPenyuluhByUserId($userId: String!) {
    penyuluhGetPenyuluhByUserId(userId: $userId) {
      id
      nik
      nsp
      nama
      jenjang
      institusi
      profesi
      alamat
      kabupaten {
        provinsi {
          id
          nama
        }
        id
        nama
      }
      provinsi {
        id
        nama
      }
      email
      handphone
      username
      totalPoin
      tempatLahir
      tanggalLahir
      jenisKelamin
      pendidikanTerakhir
      thumbnail
      image
      imageFile
      rewards {
        id
        nama
        value
        image
      }
    }
  }
`

export function usePenyuluhGetPenyuluhByUserIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    PenyuluhGetPenyuluhByUserIdQuery,
    PenyuluhGetPenyuluhByUserIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    PenyuluhGetPenyuluhByUserIdQuery,
    PenyuluhGetPenyuluhByUserIdQueryVariables
  >(PenyuluhGetPenyuluhByUserIdDocument, options)
}