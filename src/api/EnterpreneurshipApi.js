import { api, getResponseData, escalateError } from "./index";
export default class EnterpreneurshipApi{
    static async getEnterpreneurships(){
        return await api.get('/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async createEnterpreneurship(enterpreneurshipData){
        return await api.post('/', enterpreneurshipData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateEnterpreneurship(enterpreneurshipData){
        return await api.put('/', enterpreneurshipData)
        .then(getResponseData)
        .catch(escalateError);
    }
    static async deleteEnterpreneurship(enterpreneurshipId){
        return await api.delete(`/${enterpreneurshipId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
};