import test from './test';
import local from './local';

const env = process.env.NODE_ENV || 'local';

const configs = {
  test,
  local,
}

export default () => {
  if(!configs[env]) throw new Error(`config[${env}] not found`);
  return configs[env];
}