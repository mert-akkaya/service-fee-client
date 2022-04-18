import { useState } from 'react'
import { ListGroup, Badge, Button, Form } from "react-bootstrap"
import CustomerDelete from '../../CustomerDelete/CustomerDelete';
import ScrollableFeed from 'react-scrollable-feed'
import WritedCustomerService from '../../services/writedCustomerService';
import { useWritedCustomers } from '../../Context/WritedCustomerContext';


function WritedCustomerList() {

    const [customerName, setCustomerName] = useState("");

    const { writedCustomers, setWritedCustomers } = useWritedCustomers();

    const [fileSelected, setFileSelected] = useState();

    const handleChange = (e) => {
        e.preventDefault()
        setWritedCustomers([...writedCustomers, { name: customerName }])
        setCustomerName("");
    }


    const deleteDatabase = (id) => {
        let writedCustomerService = new WritedCustomerService();
        writedCustomerService.delete(id).then(() => {
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
        const writedCustomerService = new WritedCustomerService();
        try {
            const res = await writedCustomerService.getAllByExcel(formData).then((result) => { setWritedCustomers(result.data) });
        } catch (ex) {
            console.log(ex);
        }
    }



    return (
        <>
            <h1>Writed Customers</h1>
            <div className='itemlist'>
                <ScrollableFeed forceScroll="true">
                    {writedCustomers.length < 1 ? <p>Please upload excel file</p> : ""}
                    <ListGroup as="ol" numbered >
                        {
                            writedCustomers?.map((customer) => (
                                <ListGroup.Item key={customer?.id} style={{ height: 50 }} as="li">{customer.name}-{customer.city}<Badge key={customer?.id} style={{ float: 'right' }} bg="primary" pill>
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
                <Form.Control value={customerName} onChange={(e) => { setCustomerName(e.target.value) }} /><br />
                <Button style={{ float: 'right' }} variant="outline-primary" type='submit' onClick={handleChange} >Send</Button>

            </form>
            <br></br> <br></br>
            <input style={{ float: 'revert' }} type="file" onChange={saveFileSelected} /><br></br><br></br>
            <Button style={{ float: 'revert' }} type="button" variant="outline-primary" onClick={importFile} >Upload</Button>
        </>
    )
}

export default WritedCustomerList