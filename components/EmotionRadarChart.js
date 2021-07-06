import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Container,
  Typography,
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { useCallback, useState } from 'react';
import EmotionData from './EmotionData';
import EmotionCounter from './EmotionCounter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  title: {
    color: 'inherit',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 500,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const style = {
  top: '15%',
  left: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const colorlist = EmotionData(2);
const title = EmotionData(5);
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}, any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={ x } y={ y } fill="white"
      textAnchor={ x > cx ? "start" : "end" }
      dominantBaseline="central">
      { `${(percent * 100).toFixed(0)}%` }
    </text>
  );
};

export default function EmotionRadarChart({ intro, data }) {
  const classes = useStyles();
  const emotions = EmotionCounter(data, 0);
  const collections = EmotionCounter(data, 2);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = emotions[activeIndex];
  const handleClick = useCallback(
    (entry, index) => { setActiveIndex(index); }, [setActiveIndex]
  );
  return (
    <div className={ classes.root }>
      <Container maxWidth="lg">
        <Typography className={ classes.title }>{ intro }</Typography>
        <Grid container spacing={ 1 }>
          <Grid item xs={ 6 }>
            <Paper className={ classes.paper }>
              <PieChart width={ 500 } height={ 600 }>
                <Pie data={ emotions }
                  cx={ 270 } cy={ 300 }
                  outerRadius={ 220 }
                  labelLine={ false }
                  label={ renderCustomizedLabel }
                  fill="#8884d8"
                  dataKey="total">
                  { emotions.map((entry, index) => (
                    <Cell cursor="pointer"
                      key={ `cell-${index}` }
                      dataKey={ `${entry.title}` }
                      name={ `${entry.title}: ${entry.total}` }
                      fill={ colorlist[index % colorlist.length] } />
                  )) }
                </Pie>
                <Legend
                  iconSize={ 12 }
                  layout="vertical"
                  verticalAlign="middle"
                  wrapperStyle={ style }
                />
              </PieChart>
            </Paper>
          </Grid>
          <Grid item xs={ 6 }>
            <Paper className={ classes.paper }>
              <RadarChart data={ collections }
                width={ 500 } height={ 600 }
                cx={ 245 } cy={ 300 }
                outerRadius={ 200 }>
                <PolarGrid strokeDasharray="2 1" stroke="#8c8c89" />
                <PolarAngleAxis dataKey="date" fontSize={ 10 } />
                <PolarRadiusAxis stroke="#8c8c89" angle={ 15 } domain={ [0, 6] } />
                { title.map((entry, index) => (
                  <Radar key={ index }
                    name={ title[index] }
                    dataKey={ title[index] }
                    stroke={ colorlist[index] }
                    fillOpacity={ 0.2 }
                    strokeWidth={ 0.8 }
                    fill={ colorlist[index] }
                  />
                )) }
              </RadarChart>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};