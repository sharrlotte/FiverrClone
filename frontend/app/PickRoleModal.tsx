import { useSession } from '@/context/SessionContext';
import React from 'react';

export default function PickRoleModal() {
  const { session } = useSession();

  if (session && !session.rolePicked){
    
  }

  return <div>PickRoleModal</div>;
}
