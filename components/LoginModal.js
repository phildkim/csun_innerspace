import {
  Backdrop,
  Fade,
  makeStyles,
  Modal,
} from '@material-ui/core';
import LoginPrompt from './LoginPrompt';

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 80
  },
});

export default function LoginModal({ open, onClose }) {
  const classes = useStyles();
  return (
    <Modal
      open={ open }
      onClose={ onClose }
      className={ classes.modal }
      BackdropComponent={ Backdrop }
      BackdropProps={ { timeout: 500 } }
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition>
      <Fade in={ open }>
        <LoginPrompt onClose={ onClose } open={ open } />
      </Fade>
    </Modal>
  );
};