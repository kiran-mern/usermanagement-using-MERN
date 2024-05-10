import { useLocation } from "react-router-dom";

const Error = () => {
  const location = useLocation();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>
        The requested URL <code style={{color:'blue'}}>{location.pathname}</code> was not found on this server.
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '50px',
  },
  heading: {
    fontSize: '3em',
    color: 'red',
  },
  message: {
    fontSize: '1.5em',
  },
};

export default Error;
