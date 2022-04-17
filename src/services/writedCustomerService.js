import axios from "axios";

export default class WritedCustomerService{

    getAll(){
        return axios.get("https://localhost:5001/WritedCustomer")
    }

    add(customerAddModel){
        return axios.post("https://localhost:5001/WritedCustomer",customerAddModel);
    }

    delete(customerDeleteModel){
        return axios.post("https://localhost:5001/WritedCustomer/delete",customerDeleteModel);
    }
}