export interface PaginateSortedParamDto {
    id: string
    desc?: boolean
  }
  
  export interface PaginateFilterParamDto {
    id: string
    value: string | number
  }
  
  export interface PaginateFilterParamWithLabelDto
    extends PaginateFilterParamDto {
    label: string
  }
  
  /**
   * To create pagination data
   */
  export interface PaginateRequestDto extends NonPaginateRequestDto {
    /**
     * page number
     */
    page: number
    /**
     * total data per page
     */
    pageSize: number
  }
  
  export interface NonPaginateRequestDto {
    sorted: PaginateSortedParamDto[]
  
    filtered: PaginateFilterParamDto[]
  
    search?: string
  }
  
  /**
   * Response of paginated request
   */
  export interface PaginateResponseDto<T> {
    /**
     * Total number of page
     */
    pages: number
  
    /**
     * Total data count
     */
    count: number
  
    /**
     * Data items
     */
    data: T[]
  }
  
  /**
   * Query condition
   */
  export type Condition = {
    /**
     * Field name alias based on alias you created on query builder.
     */
    alias?: string
    /**
     * Completely replace field with alias instead of chain it
     */
    replace?: boolean
    /**
     * Condition function. Default: `val => ${LIKE '%${val}%'}`
     */
    fn?: (value: string) => string
    /**
     * Chained condition. Default: AND
     */
    cond?: 'AND' | 'OR'
  }
  
  export type PaginateConditions<T> =
    | Partial<{ [F in keyof T]: Condition }>
    | { [F in string]: Condition }
  