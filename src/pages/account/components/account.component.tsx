import React from "react";
import { Account} from "../account.vm";
import classes from "../account.page.module.css";

interface Props {
    accountItem: Account;
    onTypeChange: (type: string) => void;
    onNameChange: (name: string) => void;
}

export const AccountComponent: React.FC<Props> = ({ accountItem, onTypeChange, onNameChange }) => {

    return (
        <div className={classes.mainContainer}>
            <span className={classes.datesContainer}>
                Tipo de cuenta:
                <select
                    className={classes.select}
                    value={accountItem.type}
                    onChange={e => onTypeChange(e.target.value)}
                >
                    <option value="">Seleccionar</option>
                    <option value="1">Cuenta Corriente</option>
                    <option value="2">Cuenta de Ahorro</option>
                    <option value="3">Cuenta de Nómina</option>
                </select>
            </span>
            <span className={classes.datesContainer}>
                Alias:
                <input className={classes.input}
                    type="text"
                    value={accountItem.name}
                    onChange={e => onNameChange(e.target.value)}
                />
            </span>
        </div>
    );
};