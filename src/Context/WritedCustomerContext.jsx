import { createContext, useContext, useState } from "react"

const WritedCustomerContext = createContext();


export const WritedCustomerProvider = ({children})=>{

    const [writedCustomers, setWritedCustomers] = useState([]);

    const values = {
        writedCustomers,
        setWritedCustomers
    }

    return (<WritedCustomerContext.Provider value={values} >{children}</WritedCustomerContext.Provider>)
}

export const useWritedCustomers = ()=> useContext(WritedCustomerContext);    