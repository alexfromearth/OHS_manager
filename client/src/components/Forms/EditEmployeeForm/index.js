import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {useDispatch, useSelector} from "react-redux";
import {
  clearFormInputs, editEmployeeSC,
  setAllEmployeeFormInputs,
  setNewEmployeeFormInput, trimFormInputs
} from "../../../redux/actionCreators/ActionCreators";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  btnWrapper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  }
}));

export default function EditEmployeeForm() {
  const forms = useSelector(state => state.forms);
  const worker = useSelector(state => state.allStaff.worker);
  const companyId = useSelector(state => state.auth.companyId)
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const {generalInfo, profInfo} = worker;
  const currencies = [
    {value: 'Мужской'},
    {value: 'Женский'},
  ]
  const currencies1 = [
    {value: 'Высшее Магистратура'},
    {value: 'Высшее Бакалавриат'},
    {value: 'Среднее специальное'},
    {value: 'Среднее'},
  ]

  useEffect(() => {
    if (worker.generalInfo && worker.profInfo) {
      dispatch(setAllEmployeeFormInputs(generalInfo, profInfo))
    }
  }, [dispatch, setAllEmployeeFormInputs, worker.generalInfo, worker.profInfo])

  function handleChange(e) {
    const name = e.target.name;
    dispatch(setNewEmployeeFormInput(name, e.target.value))
  }

  function handleEdit() {
    const {
      firstName, lastName, middleName, birthday, sex, birthPlace, address, education,
      structuralSubdivision, startWorkDate, position, workExperience,
    } = forms;
    const generalInfo = {firstName, lastName, middleName, birthday, sex, birthPlace, address};
    const profInfo = {
      education, structuralSubdivision, startWorkDate, position, workExperience
    };
    dispatch(trimFormInputs());
    dispatch(editEmployeeSC(companyId, worker._id, generalInfo, profInfo));
    history.push(`/employee/${worker._id}`);
  }

  function handleCancel() {
    dispatch(clearFormInputs());
    history.goBack()
  }


  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Изменение информации <br/> о работнике
        </Typography>
        <br/>
        <>
          <>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="date"
                  label="Дата рождения"
                  name="birthday"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={forms.date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="sex"
                  select
                  label="Пол"
                  name="sex"
                  autoComplete="Пол"
                  value={forms.sex}
                  fullWidth
                  onChange={handleChange}
                  helperText="Пожалуйста выберите свой пол"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
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
            <br/>
            <br/>
            <Typography variant="h6" gutterBottom>
              Профессиональная информация
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
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
                  {currencies1.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12}>
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
            </Grid>
            <br/>
            <div className={classes.btnWrapper}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleEdit}
                className={classes.button}
              >
                Применить изменения
              </Button>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleCancel}
              >
                Отмена
              </Button>
            </div>
          </>
        </>
      </Paper>
    </main>
  );
}
