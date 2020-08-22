import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import EachDocument from './EachDocument';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: '90%',
      // backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    h1: {
      textAlign: 'center'
    }
  }),
);

export default function Note() {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.h1}>Памятка сотрудника охраны труда</h1>

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Основные документы
          </ListSubheader>
        }
        className={classes.root}
      >
        <EachDocument className={classes.root} document={'1-29'} nameOfDocument={'Об утверждении порядка обучения по охране труда и проверки знаний требований охраны труда работников организаций'} size={'173 KB'} />

        <EachDocument document={'73'} nameOfDocument={'Об утверждении форм документов, необходимых для расследования и учета несчастных случаев на производстве, и положения об особенностях расследования несчастных случаев на производстве в отдельных отраслях и организациях'} size={'674 KB'} />

        <EachDocument document={'155H'} nameOfDocument={'Об утверждении правил по охране труда при работе на высоте'} size={'1,3 MB'} />

        <EachDocument document={'290H'} nameOfDocument={'Об утверждении Межотраслевых правил обеспечения работников специальной одеждой, специальной обувью и другими средствами индивидуальной защиты'} size={'146 KB'} />

        <EachDocument document={'302H'} nameOfDocument={'Об утверждении перечней вредных и опасных производственных факторов и работ, при выполнении которых проводятся обязательные предварительные и периодические медицинские осмотры, и порядка проведения обязательных предварительных и периодических медицинских осмотров работников, занятых на тяжелых работах и на работах с вредными и опасными условиями труда.'} size={'1,4 MB'} />

        <EachDocument document={'426-ФЗ'} nameOfDocument={'О специальной оценке условий труда'} size={'328 KB'} />

        <EachDocument document={'1122Н'} nameOfDocument={'Об утверждении типовых норм бесплатной выдачи работников смывающих и обезвреживающих средств и стандарта безопастности труда'} size={'111 KB'} />
      </List>
    </>
  );
}
