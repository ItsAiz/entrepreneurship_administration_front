import { api, getResponseData, escalateError } from "./index";
export default class EnterpreneurshipApi{
    static async getEnterpreneurships(){
        return await api.get('empre/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async createEnterpreneurship(enterpreneurshipData){
        return await api.post('empre/saveAdmin', enterpreneurshipData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateEnterpreneurship(enterpreneurId, formData){
        console.log(formData);
        return await api.put(`empre/${enterpreneurId}`, formData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async deleteEnterpreneurship(enterpreneurshipId){
        return await api.delete(`empre/${enterpreneurshipId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
    
    static async getDownloadFile(studentDocumentNumber){
        return await api.get(`empre/getFile/${studentDocumentNumber}`, {
            headers: {
              'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            responseType: 'blob',
        })
        .then(getResponseData)
        .catch(escalateError);
    }

    static async createEnterpreneurshipByUser(enterpreneurshipData){
        return api.post('empre/saveByUser', enterpreneurshipData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async getEnterpreneurshipsByUser(userId){
        return api.get(`empre/${userId}` )
        .then(getResponseData)
        .catch(escalateError);
    }
};