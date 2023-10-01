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
        const {
            business_plan,
            category,
            data_status,
            id_user,
            name,
            physical_point,
            physical_resources,
            plan_status,     
            technological_resources
        } = enterpreneurshipData;
        const formData = new FormData();
        formData.append('business_plan', business_plan);
        formData.append('category', category);
        formData.append('data_status', data_status);
        formData.append('id_user', JSON.stringify(id_user));
        formData.append('name', name);
        formData.append('physical_point', physical_point);
        formData.append('physical_resources', JSON.stringify(physical_resources));
        formData.append('plan_status', plan_status);
        formData.append('technological_resources', JSON.stringify(technological_resources));
        return await api.put(`empre/${enterpreneurshipData._id}`, formData)
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
};