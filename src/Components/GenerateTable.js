import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
};


class GenerateTable extends React.Component {
    // constructor(props){
    //     super(props);
    // }

    render() {
        const { classes } = this.props;
        let data = this.props.chartData !== null ? this.props.chartData : null;
        let salesData = [];
        data.map((item) => salesData = item.sales);


        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">WEEK ENDING</TableCell>
                            <TableCell align="right">RETAIL SALES</TableCell>
                            <TableCell align="right">WHOLESALE SALES</TableCell>
                            <TableCell align="right">UNITS SOLD</TableCell>
                            <TableCell align="right">RETAILER MARGIN</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data !== null
                            ?
                            
                                salesData.map((item, index) => {
                                    return (
                                        <TableRow key={index} >
                                            <TableCell align="right">{item.weekEnding} </TableCell>
                                            <TableCell align="right">$ {item.retailSales}</TableCell>
                                            <TableCell align="right">$ {item.wholesaleSales}</TableCell>
                                            <TableCell align="right">{item.unitsSold}</TableCell>
                                            <TableCell align="right">$ {item.retailerMargin}</TableCell>
                                        </TableRow>
                                    );
                            })
                            : <TableRow key={0}>
                                <TableCell>Data is not available</TableCell>}
                        </TableRow>}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

GenerateTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenerateTable);