import React, {useState } from 'react'
import Combine from './Combine/Combine'
import FeeCustomerList from './CustomerList/FeeCustomer/FeeCustomerList'
import WritedCustomerList from './CustomerList/WritedCustomer/WritedCustomerList'

function Main() {

    const [combines, setCombines] = useState([]);


    return (
        <div>
            <div className='container'>
                <div className="row">
                    <div className="col-4">
                       <FeeCustomerList  />
                    </div>
                    <div className='col-4'>
                            <Combine combines={combines} setCombines={setCombines} />
                    </div>
                   
                    <div className="col-4">
                        <WritedCustomerList  />
                    </div>
                  
                </div>
            </div>
            
        </div >
    )
}

export default Main