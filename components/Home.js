
export default function Home(props) {
  const { intro, username, password } = props;
  return <>
    <span>{ intro }</span><br /><br />
    <span>TO VIEW GRAPHS:</span><br />
    <span>{ username }</span><br />
    <span>{ password }</span><br /><br />
    <span>REGISTER AND LOGIN TO SELECT 3D MODELS</span>
  </>
};
