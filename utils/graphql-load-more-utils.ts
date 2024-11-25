import { OperationVariables } from '@apollo/client'
import { PaginateResponseDto } from '@/libs/dto'

interface UpdateQueryOptions<TData = any, TVariables = OperationVariables> {
    fetchMoreResult?: TData
    variables?: TVariables
}

export class GraphQLLoadMoreUtils {
    /**
     * Handle `updateQuery` options for infinite scroll
     *
     * @param key query name
     */
    static handleUpdateQuery<
        TData extends { [k in keyof TData]: PaginateResponseDto<any> },
        TVariables = OperationVariables
    >(key: keyof TData) {
        return (
            previousQueryResult: TData,
            { fetchMoreResult }: UpdateQueryOptions<TData, TVariables>
        ): TData => {
            // Don't do anything if there weren't any new items
            if (!fetchMoreResult || fetchMoreResult[key].data.length === 0) {
                return previousQueryResult
            }

            return {
                [key]: {
                    ...fetchMoreResult[key],
                    data: [...previousQueryResult[key].data, ...fetchMoreResult[key].data]
                }
            } as any
        }
    }
}