import { api, getResponseData, escalateError } from "./index";

export default class EventApi{
    static async getEvents(){
        return await api.get('events/')
        .then(getResponseData)
        .catch(escalateError);
    }

    static async getEvent(eventId){
      return await api.get(`events/${eventId}`)
      .then(getResponseData)
      .catch(escalateError);
  }

    static async createEvent(eventData){
        return await api.post('events/', eventData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async updateEvent(eventData){
        return await api.put(`events/${eventData._id}`, eventData)
        .then(getResponseData)
        .catch(escalateError);
    }

    static async deleteEvent(eventId){
        return await api.delete(`events/${eventId}`)
        .then(getResponseData)
        .catch(escalateError);
    }
    
};