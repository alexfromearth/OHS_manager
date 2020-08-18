import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import {useSelector} from "react-redux";


export default function Review() {
    const forms = useSelector(state => state.forms);

    function handleChange() {

    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
               Проверьте информацию о новом сотруднике
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
                        disabled
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
                        disabled
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
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="date"
                        label="Дата рождения"
                        name="birthday"
                        type="date"
                        defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={forms.date}
                        onChange={handleChange}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="sex"
                      name="sex"
                      label="Пол"
                      fullWidth
                      autoComplete="Пол"
                      value={forms.sex}
                      onChange={handleChange}
                      disabled
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
                        disabled
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
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="education"
                        name="education"
                        label="Образование"
                        fullWidth
                        autoComplete="education"
                        value={forms.education}
                        onChange={handleChange}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="position"
                        name="position"
                        label="Должность"
                        fullWidth
                        autoComplete="position"
                        value={forms.position}
                        onChange={handleChange}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="workExperience"
                        name="workExperience"
                        label="Стаж работы"
                        fullWidth
                        autoComplete="workExperience"
                        value={forms.workExperience}
                        onChange={handleChange}
                        disabled
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                      required
                      id="structuralSubdivision"
                      name="structuralSubdivision"
                      label="Структурное подразделение"
                      fullWidth
                      autoComplete="structuralSubdivision"
                      value={forms.structuralSubdivision}
                      onChange={handleChange}
                      disabled
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                      required
                      id="startWorkDate"
                      name="startWorkDate"
                      label="Дата начала работы"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                          shrink: true,
                      }}
                      value={forms.startWorkDate}
                      onChange={handleChange}
                      disabled
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
