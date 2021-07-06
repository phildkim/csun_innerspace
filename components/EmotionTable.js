import {
  Box,
  colors,
  makeStyles,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  withStyles
} from '@material-ui/core';
import { useState } from 'react';
import EmotionData from './EmotionData';
const rows = EmotionData(0);
const columns = EmotionData(1);
const colorlist = EmotionData(2);
const header = EmotionData(3);
const body = EmotionData(4);

const useStyles = makeStyles(theme => ({
  root: { width: '100%' },
  table: { minWidth: 650 },
  title: {
    color: 'inherit',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 500,
  },
  switch: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 600
  },
  space: {
    textAlign: 'center',
    margin: theme.spacing(62)
  },
  total: {
    textAlign: 'right',
    fontSize: 22,
    fontWeight: 600
  }
}));

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function EmotionTable({ intro, data }) {
  const classes = useStyles();
  const [state, setState] = useState({ checked: true });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  // check if even
  const iseven = (id) => { return (id % 2 === 0) ? true : false; };
  // convert numbers to even or odd
  const convert = (id, j) => {
    return (id % 2 === 0 && j === null) ?
      Math.floor(id /= 2) : (j % 2 !== 0 && id === null) ?
        Math.floor(j /= 2) : null;
  };
  // count if titleId && emotionId match, then count last row for emotions total
  function counter(id, eid) {
    let count = 0;
    data.map(obj => {
      count += (obj.titleId === id && obj.emotionId == eid) ?
        1 : (eid > 5 && obj.titleId === id) ? 1 : 0
    });
    return count;
  };

  return <>
    <div className={ classes.root }>
      <TableContainer component={ Paper }>
        <Typography className={ classes.title }>{ intro }</Typography>
        <Table className={ classes.table } size="small" stickyHeader>
          <caption>
            <Box className={ classes.switch } component="div" display="inline">
              <AntSwitch checked={ state.checked } onChange={ handleChange } name="checked" />
            </Box>
            <Box className={ classes.space } component="div" display="inline"> </Box>
            <Box className={ classes.total } component="div" display="inline">TOTAL: { data.length }</Box>
          </caption>
          <TableHead>
            <TableRow>
              { header.map((col) => (
                <TableCell
                  key={ col.id }
                  align={ col.numeric ? 'left' : 'right' }
                  padding={ col.disablePadding ? 'none' : 'default' }
                  style={ {
                    padding: 12,
                    fontSize: 16,
                    fontWeight: 800,
                    minWidth: col.minWidth,
                    color: colorlist[convert(col.id, null)],
                    backgroundColor: colors.grey[100]
                  } }>
                  { col.label }
                </TableCell>
              )) }
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((i) => {
              return (
                <TableRow hover role="checkbox" key={ i }>
                  { body.map((row, j) => {
                    const value = columns[convert(null, j)];
                    return (
                      <TableCell key={ j }
                        align={ row.numeric ? 'left' : 'right' }
                        padding={ row.disablePadding ? 'none' : 'default' }
                        style={ {
                          height: row.height,
                          minWidth: row.minWidth,
                          padding: i === 6 ? 11 : null,
                          fontSize: i === 6 ? 15 : 12,
                          fontWeight: (i === 6 || !iseven(row.id)) ? 700 : null,
                          backgroundColor: i === 6 ? colors.grey[100] : null,
                          color: (iseven(row.id) && i === 6) ? colorlist[convert(row.id, null)] : null
                        } }>{ iseven(row.id) ? row.label[i] : counter(value, i) }
                      </TableCell>
                    );
                  }) }
                </TableRow>
              );
            }) }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>
};
