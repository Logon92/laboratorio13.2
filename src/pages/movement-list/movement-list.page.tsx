import { AppLayout } from "@/layouts";
import React from "react";
import classes from "./movement-list.page.module.css";
import { MovementListTableComponent } from "./components/movement-list-table.component";
import { MovementVm } from "./movement-list.vm";
import { useParams } from "react-router-dom";
import { getMovements } from "./api";
import { getAccountById} from "./api/account.api";
import { Account} from "../account-list/api/account-list.api-model";

const getFirstBalance = (movementsList: MovementVm[]): number | undefined => {
  return movementsList.length > 0 ? movementsList[0].balance : undefined;
};

export const MovementListPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movementsList, setMovementsList] = React.useState<MovementVm[]>([]);
  const [account, setAccount] = React.useState<Account | undefined>();

  const loadMovements = async () => {
    const movements = await getMovements(id || "");
    setMovementsList(movements);
  };

  const loadAccount = async () => {
    if (id) {
      const acc = await getAccountById(id);
      setAccount(acc);
    }
  };

  React.useEffect(() => {
    loadMovements();
    loadAccount();
  }, [id]);

  const firstBalance = getFirstBalance(movementsList);

  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <h1>Saldos y Últimos movimientos</h1>
          <div className={classes.moneyContainer}>
            <p className={classes.caption}>SALDO DISPONIBLE</p>
            <p className={classes.money}>{firstBalance ?? 0}€</p>
          </div>
        </div>
        <div className={classes.accountInfo}>
          <p>Alias: {account?.name || "--"}</p>
          <p>IBAN: {account?.iban || "--"}</p>
        </div>
        <MovementListTableComponent movementList={movementsList} />
      </div>
    </AppLayout>
  );
};