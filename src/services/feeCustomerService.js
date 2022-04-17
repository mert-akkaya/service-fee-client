import axios from "axios";

export default class FeeCustomerService{

    getAll(){
        return axios.get("https://localhost:5001/FeeCustomer")
    }

    add(customerAddModel){
        return axios.post("https://localhost:5001/FeeCustomer",customerAddModel);
    }

    delete(customerDeleteModel){
        return axios.post("https://localhost:5001/FeeCustomer/delete",customerDeleteModel);
    }
}