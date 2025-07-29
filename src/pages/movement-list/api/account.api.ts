import { Account} from '../../account-list/api/account-list.api-model';

export const getAccountById = async (id: string): Promise<Account | undefined> => {
    const url = `${import.meta.env.VITE_BASE_API_URL}/account-list`;
    const response = await fetch(url);
    const accounts: Account[] = await response.json();
    return accounts.find(account => account.id === id);
};