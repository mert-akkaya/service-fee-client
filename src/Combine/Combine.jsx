import React from 'react'
import { Badge, ListGroup,Button } from 'react-bootstrap'
import { useFeeCustomers } from '../Context/FeeCustomerContext';
import ScrollableFeed from 'react-scrollable-feed'
import { useWritedCustomers } from '../Context/WritedCustomerContext';

function Combine({ combines, setCombines }) {


    const { writedCustomers } = useWritedCustomers();

    const { feeCustomers } = useFeeCustomers();

    const newArr = [];

    const handleChange = (e) => {
        e.preventDefault()
        var result = calculate();
         setCombines(result)
    }

    const calculate = () => {
       feeCustomers.forEach((f)=>writedCustomers.forEach((w)=>{
           if(f.name === w.name){
             newArr.push(f.name)
           }
       }))
       return newArr
    }
    return (
        <>
            {
                !combines.length < 1 ? (
                    <div>
                        <h1>Combines</h1><br /><br /><br />
                        <div className='itemlist'>
                        <ScrollableFeed forceScroll="true">
                            <ListGroup as="ol" numbered >
                                {

                                    combines?.map((combine, index) => (
                                        <ListGroup.Item key={index} style={{ height: 50 }} as="li">{combine}<Badge style={{ float: 'right' }} bg="primary" pill>
                                            {/* <CustomerDelete customer={customer} deleteDatabase={deleteDatabase} /> */}
                                        </Badge></ListGroup.Item>
                                    ))

                                }
                            </ListGroup>
                                </ScrollableFeed>
                        </div>

                        <br /><br />

                        
                        <Button style={{float:'left',marginLeft:150}} variant="outline-primary" type='submit' onClick={()=>{setCombines([])}} >Clear</Button>
                    </div>
                ) : ( <Button style={{marginLeft:150,marginTop:400}} type='submit' onClick={handleChange}  >Combine</Button>)
            }



        </>
    )
}

export default Combine