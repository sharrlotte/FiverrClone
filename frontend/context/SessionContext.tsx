'use client';

import api from '@/api/api';
import { Session } from '@/schema/user.schema';
import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

export type SessionState = 'loading' | 'authenticated' | 'unauthenticated';

type SessionContextType =
  | {
      session: null;
      state: 'loading' | 'unauthenticated';
    }
  | {
      session: Session;
      state: 'authenticated';
    };

const defaultContextValue: SessionContextType = {
  session: null,
  state: 'loading',
};

export const SessionContext = React.createContext<SessionContextType>(defaultContextValue);

export function useSession(): SessionContextType {
  const context = React.useContext(SessionContext);

  if (!context) {
    throw new Error('Can not use out side of context');
  }

  return context;
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [auth, setSession] = useState<SessionContextType>({
    state: 'loading',
    session: null,
  });

  useLayoutEffect(() => {
    api
      .get<any, { data: Session }>('/auth/session')
      .then(({ data }) => data)
      .then((session) =>
        session
          ? setSession({
              session,
              state: 'authenticated',
            })
          : setSession({ state: 'unauthenticated', session: null }),
      );
  }, [setSession]);

  useInterval(() => {
    api
      .get<any, { data: Session }>('/auth/session')
      .then(({ data }) => data)
      .then((session) =>
        session
          ? setSession({
              session,
              state: 'authenticated',
            })
          : setSession({ state: 'unauthenticated', session: null }),
      );
  }, 300000);

  return <SessionContext.Provider value={auth}>{children}</SessionContext.Provider>;
}
