'use client';

import { io } from 'socket.io-client';

export const socket = io('ws://localhost:8080/socket', {
  transports: ['websocket', 'xhr-polling'],
  autoConnect: false,
  auth: (cb) => {
    return cb({ Authorization: getAccessToken() });
  },
});

export function getAccessToken() {
  return 'Bearer ' + getCookie('jwt');
}

function getCookie(cname: string) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
