import React from 'react'
import { useSelector } from 'react-redux'
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
    marginTop: '9%',
    marginBottom: '9%',
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
  },
  a: {
    textDecoration: 'none'
  }
}));

export default function Company() {

  const classes = useStyles()
  const companyName = useSelector(state => state.auth.companyName)
  const companyType = useSelector(state => state.auth.companyType)
  const companyDirector = useSelector(state => state.auth.companyDirector)
  const companyEmail = useSelector(state => state.auth.companyEmail)
  const generalInfo = useSelector(state => state.auth.generalInfo)

  return (
    <>
      <div className={classes.head}>
        <Avatar
          variant="square"
          src={`https://pm.expert/upload/iblock/27d/27d63a847f1d21f2c0f1a07e42ddff52.png`} //TODO
          className={classes.large}
        />
        <a href={generalInfo.site} className={classes.a}>
          <Box color="info.main">{companyType} {companyName}</Box>
        </a>
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
          <Box className={classes.inbox} color="text.primary">Директор:</Box>
          <Box color="info.main">{companyDirector}</Box>
        </div>
        <br></br>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">Email:</Box>
          <Box color="info.main">{companyEmail}</Box>
          <CopyToClipboard text={companyEmail} >
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
          <Box className={classes.inbox} color="text.primary">РС:</Box>
          <Box color="info.main">40821810450340038980</Box>
          <CopyToClipboard text={generalInfo.OGRN} >
            <Button className={classes.btn}>
              <FileCopyOutlinedIcon />
            </Button>
          </CopyToClipboard>
        </div>
        <div className={classes.infoRow}>
          <Box className={classes.inbox} color="text.primary">ЛС:</Box>
          <Box color="info.main">4082183450340038980</Box>
          <CopyToClipboard text={generalInfo.OGRN} >
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
