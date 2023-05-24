import { useEffect, useContext } from 'react';
import axios from 'axios';
import Layout from './Layout';
import { MyContext } from '../contexts/MyContextProvider';
import jwt_decode from 'jwt-decode';

export default function MyApp({ Component, pageProps }) {
  const { updateState } = useContext(MyContext);

  const getToken = () => {
    return localStorage.getItem('token');
  }
  useEffect(() => {
    const token = getToken();
    if (token) {
      axios
        .post(
          '/api/token',
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            updateState(jwt_decode(response.data.token));
          }
        })
        .catch(error => {
          console.log('Ошибка при получении нового токена:', error);
          updateState({});
        });
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
