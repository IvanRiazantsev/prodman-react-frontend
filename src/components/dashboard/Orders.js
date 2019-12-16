import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {useTranslation} from "react-i18next";

// Generate Order Data
function createData(id, date,office, averageProductivity, averageHealth) {
    return { id, date, office, averageProductivity, averageHealth };
}

const rows = [
    createData(0, '15 November, 2019', 'Bakulina, 15', '8', 'GOOD'),
    createData(1, '16 November, 2019', 'Nauki, 10', '7', 'GOOD'),
    createData(2, '17 November, 2019', 'Sumka, 12', '8', 'EUPHORIA'),
    createData(3, '18 November, 2019', 'Pushkinska, 7', '9', 'NEUTRAL'),
    createData(4, '19 November, 2019', 'Gagarina 11', '6.5', 'NEUTRAL'),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders() {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{t("History")}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>{t("Date")}</TableCell>
                        <TableCell>{t("Office")}</TableCell>
                        <TableCell>{t("Average productivity")}</TableCell>
                        <TableCell>{t("Average health status")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.office}</TableCell>
                            <TableCell>{row.averageProductivity}</TableCell>
                            <TableCell>{row.averageHealth}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                </Link>
            </div>
        </React.Fragment>
    );
}
