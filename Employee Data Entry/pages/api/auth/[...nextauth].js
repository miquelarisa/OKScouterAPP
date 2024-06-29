import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import axios from 'axios';


export default NextAuth ({

    'pages': {
        'signIn': '/',
        'signOut': '/',
        'error': '/',

        'newUser': '/',
        'verifyRequest': '/'
    },

    'session': {
        'strategy': 'jwt'
    },

    'callbacks': {
        'jwt': async ({ token, user, account }) => {
            if (user !== null && user !== undefined) {
                token.name = user.name;
                token.username = user.username;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },

        'session': async ({ session, token }) => {
            if(token) {
                const writeToSession = (property) => {
                    if (token.hasOwnProperty(property))
                        session.user[property] = token[property];
                }
                writeToSession('name');
                writeToSession('username');
                writeToSession('email');
                writeToSession('role');
            }
            return session;
        }
    },
    'providers': [
        CredentialsProvider ({
            'credentials': { },

            async authorize (credentials) {
                return new Promise((resolve, reject) => {
                    const res = axios.post(`${process.env.URL_PAGE}/api/auth/login`, {
                        username: credentials.username,
                        password: credentials.password
                    }).then(res => {
                        resolve(res.data[0]);
                    }).catch(error => {
                        reject(error);
                    })
                })
            }
        })
    ]
});
