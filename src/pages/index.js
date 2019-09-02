import styles from './index.scss';
import { formatMessage } from 'umi-plugin-locale';
import { Redirect } from 'react-router-dom';
import react from 'react';
export default function App () {
  return (
    <Redirect to="/managerCenter/userList"></Redirect>
  );
}
