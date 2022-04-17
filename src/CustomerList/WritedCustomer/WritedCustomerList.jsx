import { useState } from 'react'
import { ListGroup, Badge,Spinner,Button,Form } from "react-bootstrap"
import CustomerDelete from '../../CustomerDelete/CustomerDelete';
import ScrollableFeed from 'react-scrollable-feed'
import WritedCustomerService from '../../services/writedCustomerService';
import { useWritedCustomers } from '../../Context/WritedCustomerContext';


function WritedCustomerList({getAll,isLoading }) {

    const [customerName, setCustomerName] = useState("");

    const {writedCustomers,setWritedCustomers} = useWritedCustomers();

    const handleChange = (e) => {
        e.preventDefault()
        setWritedCustomers([...writedCustomers, { name: customerName }])
        addDatabase(customerName);

        setCustomerName("");
    }

    const addDatabase = (name) => {
        let writedCustomerService = new WritedCustomerService();
        let customerAddModel = {
            name: name
        }
        writedCustomerService.add(customerAddModel);
    }

    const deleteDatabase =  (id) => {
        let writedCustomerService = new WritedCustomerService();
        writedCustomerService.delete(id).then(()=>{
            getAll();
        })
        
    }



    return (
        <>
            <h1>Writed Customers</h1>
            <div className='itemlist'>
                <ScrollableFeed forceScroll="true">
                {isLoading ? <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>:""}
                    <ListGroup as="ol" numbered >
                        {
                            writedCustomers?.map((customer) => (
                                <ListGroup.Item key={customer?.id} style={{ height: 50 }} as="li">{customer.name}<Badge key={customer?.id} style={{ float: 'right' }} bg="primary" pill>
                                    <CustomerDelete customer={customer} deleteDatabase={deleteDatabase} />
                                </Badge></ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </ScrollableFeed>

            </div>

            <br /><br />
            <form>
                <label >Customer Name:</label>&nbsp;
                <Form.Control value={customerName} onChange={(e) => { setCustomerName(e.target.value) }} /><br/>
                <Button style={{float:'right'}} variant="outline-primary" type='submit' onClick={handleChange} >Send</Button>
                
            </form>
        </>
    )
}

export default WritedCustomerList