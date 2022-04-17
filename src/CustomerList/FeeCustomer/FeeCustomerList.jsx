import { useState } from 'react'
import { ListGroup, Badge,Spinner,Form,Button } from "react-bootstrap"
import CustomerDelete from '../../CustomerDelete/CustomerDelete';
import ScrollableFeed from 'react-scrollable-feed'
import FeeCustomerService from '../../services/feeCustomerService';
import { useFeeCustomers } from '../../Context/FeeCustomerContext';


function FeeCustomerList({getAll,isLoading }) {

    const [customerName, setCustomerName] = useState("");

    const {feeCustomers,setFeeCustomers} = useFeeCustomers();

    const handleChange = (e) => {
        e.preventDefault()
        setFeeCustomers([...feeCustomers, { name: customerName }])
        addDatabase(customerName);

        setCustomerName("")
    }

    
    const addDatabase = (name) => {
        let feeCustomerService = new FeeCustomerService();
        let customerAddModel = {
            name: name
        }
        feeCustomerService.add(customerAddModel);
    }

    const deleteDatabase = (feeCustomer) => {
        let feeCustomerService = new FeeCustomerService();
        let customerDeleteModel = {
            id:feeCustomer.id,
            name:feeCustomer.name
        }
        feeCustomerService.delete(customerDeleteModel).then(()=>{
            getAll();
        })
        
    }



    return (
        <>

            <h1>Customers</h1>
            <div className='itemlist'>
                <ScrollableFeed forceScroll="true">
                {isLoading ? <Spinner  animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>:""}
                    <ListGroup as="ol" numbered >
                        {
                            feeCustomers?.map((customer) => (
                                <ListGroup.Item key={customer.id} style={{ height: 50 }} as="li">{customer.name}<Badge style={{ float: 'right' }} bg="primary" pill>
                                    <CustomerDelete customer={customer} deleteDatabase={deleteDatabase} />
                                </Badge></ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </ScrollableFeed>

            </div>

            <br /><br />
            <form>
                <label >Customer Name </label>&nbsp;
                <Form.Control value={customerName} onChange={(e) => { setCustomerName(e.target.value) }} /><br/>
                <Button style={{float:'left'}} variant="outline-primary" type='submit' onClick={handleChange} >Send</Button>
            </form>

        </>
    )
}

export default FeeCustomerList