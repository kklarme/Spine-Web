const REQUIRED_ENV_VARIABLES = ['REACT_APP_SERVER_URL'];

function checkEnvironmentVariables() {
  const missingEnvVars = REQUIRED_ENV_VARIABLES.reduce(
    (missingEnvVars, envVar) => {
      if (!process.env[envVar]) {
        missingEnvVars.push(envVar);
      }
      return missingEnvVars;
    },
    []
  );
  if (missingEnvVars.length) {
    throw new Error(
      missingEnvVars.reduce((msg, envVar) => {
        msg += ` ${envVar}`;
        return msg;
      }, 'Invalid environment variables. Missing:')
    );
  }
}

require('dotenv').config();
checkEnvironmentVariables();
