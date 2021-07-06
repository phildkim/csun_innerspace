import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import LazyCardGrid from './LazyCardGrid';
import Image from 'next/image';

const useStyles = makeStyles({
  root: { position: 'relative' },
  card: {
    border: '1px solid #808080',
    maxWidth: 350,
  },
  cardContent: {
    textAlign: 'center',
    backgroundColor: colors.grey[700],
  },
  cardMedia: {
    height: 260,
    width: 320
  },
  button: {
    borderTop: '1px solid #808080',
    width: '100%'
  }
});

export default function EmotionImages(props) {
  const classes = useStyles();
  const { intro } = props;
  function handleEmotionImages(item) {
    if (props.onSelect) props.onSelect(item);
  }
  return <>
    <Typography variant="h4" align="center">{ intro }</Typography>
    <Divider />
    <Box className={ classes.root } p={ 2 }>
      <LazyCardGrid
        API="/emotions"
        itemWidth={ 4 }
        placeholders={ 6 }
        cardClass={ classes.card }
        renderItem={ data => <EmotionImagesCard data={ data } handle={ handleEmotionImages.bind(null, data) } /> } />
    </Box>
  </>
}

function EmotionImagesCard({ data, handle }) {
  const classes = useStyles();
  return (
    <Card className={ classes.card }>
      <CardContent className={ classes.cardContent }>
        <CardMedia className={ classes.cardMedia }
          title={ data.title }>
          <Image
            src={ `${data.image}` }
            alt={ `${data.title}` }
            layout="responsive"
            width={ 320 }
            height={ 260 }
          />
        </CardMedia>
      </CardContent>
      <CardActionArea onClick={ handle }>
        <div className={ classes.buttonCenter }>
          <Button className={ classes.button }
            variant="contained"
            color="default"
            size="large"
            type="button">
            <Typography variant="h6" color="primary">
              <b>{ data.title }</b>
            </Typography>
          </Button>
        </div>
      </CardActionArea>
    </Card>
  );
}
