import {
  AppBar,
  Box,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import { Home, About } from '@/components';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  tabs: {
    width: '15%',
    backgroundColor: theme.palette.common.white,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const PATHS = ['/home', '/about'];

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel"
      hidden={ value !== index }
      id={ `nav-tabpanel-${index}` }
      aria-labelledby={ `nav-tab-${index}` }
      { ...other }>
      { value === index && (<Box p={ 3 }>{ children }</Box>) }
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
};

function LinkTab(props) {
  return (
    <Tab component="a"
      onClick={ (event) => { event.preventDefault(); } }
      { ...props }
    />
  );
};

export default function MainPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const { query } = router;
  const handleChange = (event, value) => {
    router.push(PATHS[value], undefined, { shallow: true });
  };
  const value = PATHS.indexOf('/' + query.main);
  return <>
    <div className={ classes.root }>
      <AppBar position="static">
        <Tabs value={ value }
          variant="fullWidth"
          onChange={ handleChange }
          aria-label="nav tabs teachers">
          <LinkTab label="Home" { ...a11yProps(0) } />
          <LinkTab label="About" { ...a11yProps(1) } />
        </Tabs>
      </AppBar>
      <TabPanel value={ value } index={ 0 }>
        <Home intro={ 'Welcome to Innerspace!' } />
      </TabPanel>
      <TabPanel value={ value } index={ 1 }>
        <About intro={ 'About Innerspace!' } />
      </TabPanel>
    </div>
  </>;
};

export function getStaticProps() {
  return {
    props: {}
  };
};

export function getStaticPaths() {
  return {
    paths: PATHS,
    fallback: false
  };
};
