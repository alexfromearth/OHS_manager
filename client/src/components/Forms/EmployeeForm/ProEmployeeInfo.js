import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import {setNewEmployeeFormInput} from "../../../redux/actionCreators/ActionCreators";
import Alert from "@material-ui/lab/Alert";
import MenuItem from "@material-ui/core/MenuItem";

export default function ProEmployeeIngo() {
    const forms = useSelector(state => state.forms);
    const errorMessage = useSelector(state => state.auth.errorMessage);
    const dispatch = useDispatch();

    function handleChange(e) {
        const name = e.target.name;
        dispatch(setNewEmployeeFormInput(name, e.target.value))
    }

  const currencies = [
    {value: 'Высшее Магистратура'},
    {value: 'Высшее Бакалавриат'},
    {value: 'Среднее специальное'},
    {value: 'Среднее'},
  ]

    return (
        <React.Fragment>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Typography variant="h6" gutterBottom>
                Профессиональная информация
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    id="education"
                    select
                    label="Образование"
                    name="education"
                    autoComplete="Образование"
                    value={forms.education}
                    fullWidth
                    onChange={handleChange}
                    helperText="Пожалуйста выберите свой уровень образования"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value} >
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
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
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
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
                />
              </Grid>
            </Grid>
        </React.Fragment>
    );
}
