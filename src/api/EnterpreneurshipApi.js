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

    static async updateEnterpreneurship(enterpreneurshipData){
        const { business_plan } = enterpreneurshipData;
        const formData = new FormData();
        formData.append('file', business_plan);
        enterpreneurshipData.filter((data) => data.business_plan !== business_plan);
        Object.keys(enterpreneurshipData).forEach((key) => {
            formData.append(key, enterpreneurshipData[key]);
        });
        return await api.put(`empre/${enterpreneurshipData._id}`, formData,  {
            headers:{
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(getResponseData)
        .catch(escalateError);
    }

    static async deleteEnterpreneurship(enterpreneurshipId){
        return await api.delete(`empre/${enterpreneurshipId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
};