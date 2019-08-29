import styles from './index.scss';
import { formatMessage } from 'umi-plugin-locale';
import { Redirect } from 'react-router-dom';
export default function App () {
  return (
    <Redirect to="/managerCenter/deviceList"></Redirect>
  );
}
