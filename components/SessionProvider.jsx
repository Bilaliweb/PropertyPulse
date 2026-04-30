'use client';

/**
 * We created this component so we can utilise this client side component inside a server side component (layout.jsx) because we can't directly utilise client side things inside server side component.
 */

import { SessionProvider } from 'next-auth/react';

const SessionProviderComponent = ({ children }) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default SessionProviderComponent;