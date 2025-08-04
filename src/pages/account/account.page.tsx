import { AppLayout } from "@/layouts";
import React from "react";
import classes from "./account.page.module.css";
import { AccountComponent} from "./components/account.component"
import { Account } from "./account.vm";

import { saveAccount } from "../account/api/acount.api";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/core/router";

import { validateAccountForm } from './account.validation';
import { createEmptyAccountFormErrors } from './account.vm';

export const AccountPage: React.FC = () => {
  const [accountItem, setAccountItem] = React.useState<Account>({
    name: "",
    type: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = React.useState(createEmptyAccountFormErrors());

  const handleSave = async () => {
    const validationResult = validateAccountForm(accountItem);
    setErrors(validationResult.errors);
  
    if (validationResult.succeeded) {
      try {
        await saveAccount(accountItem);
        navigate(appRoutes.accountList);
      } catch (error) {
        alert("No se pudo guardar la cuenta.");
      }
    }
  };

  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <h1>Cuenta Bancaria</h1>
        </div>
      </div>
      <div className={classes.selectContainer}>
        <AccountComponent
          accountItem={accountItem}
          onTypeChange={type => setAccountItem(prev => ({ ...prev, type }))}
          onNameChange={name => setAccountItem(prev => ({ ...prev, name }))}
        />
      </div>
      {errors.type && <div className={classes.error}>{errors.type}</div>}
      {errors.name && <div className={classes.error}>{errors.name}</div>}
      <div className={classes.separator}></div>
      <button className={classes.guardar} onClick={handleSave}>GUARDAR</button>
    </AppLayout>
  );
};
