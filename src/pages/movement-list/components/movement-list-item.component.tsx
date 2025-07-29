import React from "react";
import { MovementVm } from "../movement-list.vm";
import classes from "./movement-list-item.component.module.css";

interface Props {
    movementItem: MovementVm;
}

function formatDateDMY(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const MovementListItemComponent: React.FC<Props> = (props) => {
    const { movementItem } = props;

    return (
        <div className={classes.row}>
            <span className={classes.dataCell}>{formatDateDMY(movementItem.transaction)}</span>
            <span className={classes.dataCell}>{formatDateDMY(movementItem.realTransaction)}</span>
            <span className={classes.dataCell}>{movementItem.description}</span>
            <span className={`
                ${classes.dataCell} 
                ${classes.alignRight}
                ${movementItem.amount < 0 ? classes.negative : ""}
            `}>
                {`${movementItem.amount} €`}
            </span>
            <span className={`${classes.dataCell} ${classes.alignRight}`}>
                {`${movementItem.balance} €`}
            </span>
        </div>
    );
};