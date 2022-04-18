import { useState } from 'react'
import { ListGroup, Badge, Form, Button } from "react-bootstrap"
import CustomerDelete from '../../CustomerDelete/CustomerDelete';
import ScrollableFeed from 'react-scrollable-feed'
import FeeCustomerService from '../../services/feeCustomerService';
import { useFeeCustomers } from '../../Context/FeeCustomerContext';


function FeeCustomerList() {

    const [customerName, setCustomerName] = useState("");

    const { feeCustomers, setFeeCustomers } = useFeeCustomers();

    const [fileSelected, setFileSelected] = useState();

    const handleChange = (e) => {
        e.preventDefault()
        setFeeCustomers([...feeCustomers, { name: customerName }])
        setCustomerName("")
    }


    const deleteDatabase = (feeCustomer) => {
        let feeCustomerService = new FeeCustomerService();
        let customerDeleteModel = {
            id: feeCustomer.id,
            name: feeCustomer.name
        }
        feeCustomerService.delete(customerDeleteModel).then(() => {
            // getAll();
        })

    }




    const saveFileSelected = (e) => {
        setFileSelected(e.target.files[0]);
    };

    const importFile = async (e) => {
        const formData = new FormData();
        formData.append("file", fileSelected);
        console.log(formData)
        const feeCustomerService = new FeeCustomerService();
        try {
            const res = await feeCustomerService.getAllByExcel(formData).then((result) => { setFeeCustomers(result.data) });
        } catch (ex) {
            console.log(ex);
        }
    }




    return (
        <>

            <h1>Customers</h1>
            <div className='itemlist'>
                <ScrollableFeed forceScroll="true">
                    {feeCustomers.length<1 ? <p>Please upload excel file</p> : ""}
                    <ListGroup as="ol" numbered >
                        {
                            feeCustomers?.map((customer) => (
                                <ListGroup.Item key={customer.id} style={{ height: 50 }} as="li">{customer.name}-{customer.city}<Badge style={{ float: 'right' }} bg="primary" pill>
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
                <Form.Control value={customerName} onChange={(e) => { setCustomerName(e.target.value) }} /><br />
                <Button style={{ float: 'right' }} variant="outline-primary" type='submit' onClick={handleChange} >Send</Button>
            </form>

            <br></br> <br></br>
            <input style={{ float: 'revert' }}  type="file" onChange={saveFileSelected} /><br></br><br></br>
            <Button style={{ float: 'revert' }} type="button" variant="outline-primary" onClick={importFile} >Upload</Button>

        </>
    )
}

export default FeeCustomerList