import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorized(getAuthority() as any); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority() as any);
};

export { reloadAuthorized };
export default Authorized;
