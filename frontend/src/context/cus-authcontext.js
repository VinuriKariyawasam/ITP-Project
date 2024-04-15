import {createContext} from 'react';


export const CusAuthContext = createContext({
isLoggedIn: false,
userId: null,
email: null,
name: null,
token: null,
login: () => {},
logout: () => {}
})