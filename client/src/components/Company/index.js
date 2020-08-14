import React from 'react'
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(11),
    height: 'auto',
    marginRight: 30
  },
  info: {
    // marginLeft: '35%',
    marginTop: '10%',
    marginBottom: '15%',
    fontSize: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  inbox: {
    marginRight: 20
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    fontSize: 60,
    fontWeight: 'bold'
  },
  btn: {
    marginLeft: 20
  }
}));

export default function Company() {
  const classes = useStyles()
  // const companyName = useSelector(state => state.auth.companyName)
  // const generalInfo = useSelector(state => state.auth.generalInfo)
  const companyName = 'КРОК'
  const generalInfo = {
    year: 1956,
    legal_address: 'Москва, Ленинский 17',
    actual_address: 'Москва, Вавилова 1',
    type: 'ООО',
    countOfStaff: 26,
    OGRN: '1053600591197',
    BIK: '044540132',
    INN: '3664069397',
    tel: '79271669'
  }

  return (
    <>
      <div className={classes.head}>
        <Avatar
          variant="square"
          src={`https://pm.expert/upload/iblock/27d/27d63a847f1d21f2c0f1a07e42ddff52.png`} //TODO
          className={classes.large}
        />
        <Box color="info.main">{companyName}</Box>
      </div>

      <Typography component="div" variant="body1" className={classes.info}>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Дата основания:</Box>
          <Box color="info.main">{generalInfo.year}</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Юридический адрес:</Box>
          <Box color="info.main">{generalInfo.legal_address}</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Фактический адрес:</Box>
          <Box color="info.main">{generalInfo.actual_address}</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Тип компании:</Box>
          <Box color="info.main">{generalInfo.type}</Box>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Количество сотрудников:</Box>
          <Box color="info.main">{generalInfo.countOfStaff}</Box>
        </div>
        <br></br>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">ОГРН:</Box>
          <Box color="info.main">{generalInfo.OGRN}</Box>
          <CopyToClipboard text={generalInfo.OGRN} >
            <Button className={classes.btn}>
              <FileCopyOutlinedIcon />
            </Button>
          </CopyToClipboard>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">БИК:</Box>
          <Box color="info.main">{generalInfo.BIK}</Box>
          <CopyToClipboard text={generalInfo.BIK} >
            <Button className={classes.btn}>
              <FileCopyOutlinedIcon />
            </Button>
          </CopyToClipboard>

        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">ИНН:</Box>
          <Box color="info.main">{generalInfo.INN}</Box>
          <CopyToClipboard text={generalInfo.INN} >
            <Button className={classes.btn}>
              <FileCopyOutlinedIcon />
            </Button>
          </CopyToClipboard>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Телефон:</Box>
          <Box color="info.main">{generalInfo.tel}</Box>
          <CopyToClipboard text={generalInfo.tel} >
            <Button className={classes.btn}>
              <FileCopyOutlinedIcon />
            </Button>
          </CopyToClipboard>
        </div>
      </Typography>
    </>
  )
}
