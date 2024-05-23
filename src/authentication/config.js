
import React, { useState, createContext } from 'react';

export const AuthUserContext = createContext(null);



export default function Context({children}){
    const [logged, setLogged] = useState(false)
    
    return(
        <AuthUserContext.Provider value={{logged, setLogged}}>
            {children}
        </AuthUserContext.Provider>
    )
}