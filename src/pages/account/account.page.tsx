import { AppLayout } from "@/layouts";
import React from "react";
import classes from "./account.page.module.css";
import { AccountComponent} from "./components/account.component"
import { Account } from "./account.vm";

import { saveAccount } from "../account/api/acount.api";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "@/core/router";

export const AccountPage: React.FC = () => {
  const [accountItem, setAccountItem] = React.useState<Account>({
    name: "",
    type: "",
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await saveAccount(accountItem);
      navigate(appRoutes.accountList); // Redirige a la página de cuentas
    } catch (error) {
      // Opcional: muestra un mensaje si ocurre un error
      alert("No se pudo guardar la cuenta.");
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
      <div className={classes.separator}></div>
      <button className={classes.guardar} onClick={handleSave}>GUARDAR</button>
    </AppLayout>
  );
};
