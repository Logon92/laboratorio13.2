export interface Account {
    type: string;
    name: string;
}

export interface AccountFormErrors {
    name: string;
    type: string;
}

export const createEmptyAccount = (): Account => ({
    name: '',
    type: '',
});

export const createEmptyAccountFormErrors = (): AccountFormErrors => ({
    name: '',
    type: '',
});