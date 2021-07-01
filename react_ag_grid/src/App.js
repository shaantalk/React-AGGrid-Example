import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline, AppBar, Toolbar, Switch as SwitchUI, FormControlLabel, Typography} from '@material-ui/core'

import { CustomThemeContext } from './Themes/CustomThemeProvider'
import GridDemo from './Table'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.mixins.toolbar.minHeight
  },
  appBarSpacer : theme.mixins.toolbar,
}))

export default function App() {
  const classes = useStyles()
  const { currentTheme, setTheme } = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')

  const handleThemeChange = (event) => {
    const { checked } = event.target
    if (checked) {
      setTheme('dark')
    } else {
      setTheme('normal')
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Material UI - AG Grid
          </Typography>
          <FormControlLabel
            control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
            label="Theme"
          />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div style={{height: '100vh'}}>
          <GridDemo/>
        </div>
      </main>
    </div>
  )
}