import axios from "axios";

export default class WritedCustomerService{

    getAll(){
        return axios.get("https://service-fee-backend.herokuapp.com/WritedCustomer")
    }

    add(customerAddModel){
        return axios.post("https://localhost:5001/WritedCustomer",customerAddModel);
    }

    delete(customerDeleteModel){
        return axios.post("https://localhost:5001/WritedCustomer/delete",customerDeleteModel);
    }

    getAllByExcel(file){
        return axios.post("https://localhost:5001/WritedCustomer/file",file);
    }
}