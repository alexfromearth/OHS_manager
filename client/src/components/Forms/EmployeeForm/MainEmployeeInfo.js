import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import {setNewEmployeeFormInput} from "../../../redux/actionCreators/ActionCreators";

export default function MainEmployeeInfo() {
    const forms = useSelector(state => state.forms);
    const dispatch = useDispatch();

    function handleChange(e) {
        const name = e.target.name;
        dispatch(setNewEmployeeFormInput(name, e.target.value))
    }


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Общая информация
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="Имя"
                        fullWidth
                        autoComplete="given-name"
                        autoFocus
                        value={forms.firstName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Фамилия"
                        fullWidth
                        autoComplete="family-name"
                        value={forms.lastName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="middleName"
                        name="middleName"
                        label="Отчество"
                        fullWidth
                        autoComplete="middleName"
                        value={forms.middleName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={forms.date}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="birthPlace"
                        name="birthPlace"
                        label="Место рождения"
                        fullWidth
                        autoComplete="birthPlace"
                        value={forms.birthPlace}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Место проживания"
                        fullWidth
                        autoComplete="address"
                        value={forms.address}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
