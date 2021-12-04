
export enum Sign{
    Equal = "=",
    Less = "<",
    Greater = ">",
    NotEqual = "<>",
    LessOrEqual = "<=",
    GreaterOrEqual = ">="
}

export enum Field{
    Amount = "Amount",
    SpentAt = "SpentAt",
    Note = "Note",
    CategoryId = "CategoryId"
}

export interface FilterSelector {
    index: number
    value: string
}

export interface FilterSettings{
    Fields: FilterSelector[]
    Signs: FilterSelector[]
}

export interface Filter{
    Property: number
    Value: string
    Operator: number
}