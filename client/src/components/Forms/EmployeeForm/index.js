import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MainEmployeeInfo from "./MainEmployeeInfo";
import ProEmployeeInfo from "./ProEmployeeInfo";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import {
  clearFormInputs,
  setError,
  submitFormInputSC,
} from "../../../redux/actionCreators/ActionCreators";
import Review from "./Review";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Общая информация', 'Профессиональная информация', "Проверить информацию"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <MainEmployeeInfo/>;
    case 1:
      return <ProEmployeeInfo/>;
    case 2:
      return <Review/>
    default:
      throw new Error('Unknown step');
  }
}

export default function EmployeeForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const forms = useSelector(state => state.forms);
  const companyId = useSelector(state => state.auth.companyId);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    firstName,
    lastName,
    middleName,
    birthday,
    sex,
    birthPlace,
    address,
    education,
    structuralSubdivision,
    startWorkDate,
    position,
    workExperience
  } = forms;

  function findEmpty(fields, step) {
    let result = null;
    if (activeStep === step) {
      for (const [key, value] of Object.entries(fields)) {
        if (value === '') {
          return false;
        } else {
          result = true;
        }
      }
      return result;
    }
  }

  function isNotEmpty() {
    if (activeStep === 0) {
      const main = {firstName, lastName, middleName, birthday, birthPlace, address, sex};
      const res = findEmpty(main, activeStep);
      if (!res) {
        dispatch(setError('Все поля общей информации должны быть заполнены.'))
      } else {
        dispatch(setError(null));
      }
      return res;
    }
    if (activeStep === 1) {
      const prof = {education, position, workExperience, structuralSubdivision, startWorkDate};
      const res = findEmpty(prof, activeStep);
      if (!res) {
        dispatch(setError('Все поля профессиональной информации должны быть заполнены.'))
      } else {
        dispatch(setError(null));
      }
      return res;
    }
  }

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setActiveStep(activeStep + 1);
      dispatch(submitFormInputSC(
        companyId,
        {
          firstName, lastName, middleName, birthday, birthPlace, address, sex
        },
        {education, position, workExperience, structuralSubdivision, startWorkDate}))
      setTimeout(() => {
        dispatch(clearFormInputs());
        history.push('/employees');
      }, 3000);
    } else if (isNotEmpty()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Новый Работник
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Сотрудник успешно добавлен!
                </Typography>
                <Typography variant="subtitle1">
                  Новый сотрудник вашей компании был успешно добавлен, через несколько секунд вы
                  будете перенаправлены на обновленный список сотрудников!
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Назад
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Добавить работника' : 'Далее'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
