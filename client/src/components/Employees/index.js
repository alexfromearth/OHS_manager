import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {allStaffThunk} from '../../redux/thunks/allStaffThunk.js';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        justifyContent: "center",
    },
    hdr: {
        minWidth: '50vw',
        marginLeft: '15vw',
        marginRight: '15vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItem: 'center'
    },
    btns: {
        height: 50,
    },
    employee: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    wrapper: {
        minWidth: 650,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    buttonGroup: {
        minWidth: 800,
    },
    wrapperHead: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        fontWeight: 800,
        paddingTop: 7,
        paddingBottom:7,
        paddingLeft: 21,
        paddingRight: 21,
    },
    index: {
        width: 20,
        marginRight: 10,
    },
    fio: {
        width: 350,
        textAlign: "left",
    },
    prof: {
        width: 350,
        textAlign: "left",
    },
}));


export default function Employees() {
  const dispatch = useDispatch()
  const history = useHistory()
  const employees = useSelector(state => state.allStaff.list)
  const id = useSelector(state => state.auth.companyId)
  const classes = useStyles()

    useEffect(() => {
        dispatch(allStaffThunk(id))
    }, [dispatch, id])

    function handleClick(id) {
        setTimeout(() => {
            history.push(`/employee/${id}`)
        }, 210);
    }

    return (
        <>
            <div className={classes.hdr}>
                <Button variant="contained" color="primary"
                        className={classes.btns}
                        onClick={() => history.push('/employee/new')}>Добавить работника</Button>
                <h1>Cотрудники</h1>
                <Button variant="contained" color="primary" className={classes.btns}>Фильтр</Button>
            </div>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.wrapperHead}>
                        <span className={classes.index}>№</span>
                        <span className={classes.fio}>ФИО</span>
                        <span className={classes.prof}>Профессия</span>
                    </div>
                    <ButtonGroup
                        orientation="vertical"
                        color="primary"
                        className={classes.buttonGroup}
                        aria-label="vertical outlined primary button group"
                        size="large"
                        variant="outlined"
                    >
                        {employees && employees.map((el, index) => {
                            return <Button key={el._id}
                                           className={classes.employee}
                                           onClick={() => handleClick(el._id)}>
                                <span className={classes.index}>{index + 1}</span>
                                <span className={classes.fio}>{el.name}</span>
                                <span className={classes.prof}>{el.profession} </span>
                            </Button>
                        })}
                    </ButtonGroup>
                </div>
            </div>
        </>
    )
}

