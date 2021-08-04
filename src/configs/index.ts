import local from './local';

const env = process.env.NODE_ENV || 'local';

const configs = {
  local,
}

export default () => {
  if(!configs[env]) throw new Error(`config[${env}] not found`);
  return configs[env];
}