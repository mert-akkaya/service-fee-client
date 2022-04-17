import { createContext, useContext, useState } from "react"

const FeeCustomerContext = createContext();


export const FeeCustomerProvider = ({children})=>{

    const [feeCustomers, setFeeCustomers] = useState([]);

    const values = {
        feeCustomers,
        setFeeCustomers
    }

    return (<FeeCustomerContext.Provider value={values} >{children}</FeeCustomerContext.Provider>)
}

export const useFeeCustomers = ()=> useContext(FeeCustomerContext);    