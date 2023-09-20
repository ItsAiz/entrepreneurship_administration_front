import { api, getResponseData, escalateError } from "./index";
export default class EnterpreneurshipApi{
    static async getEnterpreneurships(){
        return await api.get('empre/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async createEnterpreneurship(enterpreneurshipData){
        return await api.post('empre/save', enterpreneurshipData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateEnterpreneurship(enterpreneurshipData){
        return await api.put('empre/', enterpreneurshipData)
        .then(getResponseData)
        .catch(escalateError);
    }
    static async deleteEnterpreneurship(enterpreneurshipId){
        return await api.delete(`empre/${enterpreneurshipId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
};