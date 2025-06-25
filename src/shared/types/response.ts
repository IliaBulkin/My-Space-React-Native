export interface IError {
    status: 'error'
    message: string
}

export interface ISuccess<T> {
    status: 'success'
    data: T
    token?: string;
}

export interface IReturnError{
	path: string
	message: string
}

export interface IErrorValidation {
    status: 'error-validation'
    data: IReturnError[]
}

export type Response<T> = IError | ISuccess<T> | IErrorValidation