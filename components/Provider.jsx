"use client";

import { SessionProvider } from "next-auth/react";

// browser capability so tok use client lote ya
const Provider = ({children , session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider