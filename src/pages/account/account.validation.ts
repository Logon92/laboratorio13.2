import { Account, AccountFormErrors, createEmptyAccountFormErrors } from './account.vm';

interface ValidationResult {
    succeeded: boolean;
    errors: AccountFormErrors;
}

export const validateAccountForm = (account: Account): ValidationResult => {
    let validationResult: ValidationResult = {
        succeeded: true,
        errors: createEmptyAccountFormErrors(),
    };

    if (!account.type.trim()) {
        validationResult.errors.type = "Debe seleccionar el tipo de cuenta";
        validationResult.succeeded = false;
    }

    if (!account.name.trim()) {
        validationResult.errors.name = "Debe informar el alias";
        validationResult.succeeded = false;
    }

    return validationResult;
};
