import React, { useEffect, useState } from 'react'
import Combine from './Combine/Combine'
import { useFeeCustomers } from './Context/FeeCustomerContext'
import { useWritedCustomers } from './Context/WritedCustomerContext'
import FeeCustomerList from './CustomerList/FeeCustomer/FeeCustomerList'
import WritedCustomerList from './CustomerList/WritedCustomer/WritedCustomerList'
import FeeCustomerService from './services/feeCustomerService'
import WritedCustomerService from './services/writedCustomerService'

function Main() {

    const { setWritedCustomers } = useWritedCustomers();

    const {setFeeCustomers } = useFeeCustomers();

    const [combines, setCombines] = useState([]);
    const [feeLoading, setFeeLoading] = useState(true);
    const [writedLoading, setWritedLoading] = useState(true);


    useEffect(() => {
        getAllFeeCustomers();
        getAllWritedCustomers();
    }, [])

    const getAllFeeCustomers =()=> {
        let feeCustomerService = new FeeCustomerService();
        feeCustomerService.getAll().then(result => {
            setFeeCustomers(result.data)
            setFeeLoading(false)
        })
        
    }

    const getAllWritedCustomers = async () => {
        let writedCustomerService = new WritedCustomerService();
        await writedCustomerService.getAll().then(result => {
            setWritedCustomers(result.data)
            setWritedLoading(false)
        })
    }
 
    
    return (
        <div>
            <div className='container'>
                <div className="row">
                    <div className="col-4">
                       <FeeCustomerList getAll={getAllFeeCustomers} isLoading={feeLoading} />
                    </div>
                    {/* <div className='col-4'>
                         {
                        combines.length<1 ?(
                        <button style={{marginLeft:150,marginTop:400}} >Combine</button>
                         ):
                            <Combine combines={combines} setCombines={setCombines} />
                    }
                    </div> */}
                    <div className='col-4'>
                            <Combine combines={combines} setCombines={setCombines} />
                    </div>
                   
                    <div className="col-4">
                        <WritedCustomerList getAll={getAllWritedCustomers}  isLoading={writedLoading} />
                    </div>
                  
                </div>
            </div>
            
        </div >
    )
}

export default Main