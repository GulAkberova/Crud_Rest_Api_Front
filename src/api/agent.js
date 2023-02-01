import axios from "axios";
export const BASE_URL = "http://localhost:8080/products";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const agent = {
  getAll: async (url) => {
    let responsedata = [];
    await axiosInstance
      .get(`${url}`)
      .then((res) => {
        responsedata = res.data;
      })
      .catch((err) => {
        console.log("Error", err);
        throw err;
      });

    return responsedata;
  },

  getById: async (url, id) => {
    let response = {};
    await axiosInstance.get(`${url}/${id}`).then((res) => {
      response = res.data;
    });

    if (response == null) {
      throw "404 data not found";
    }
  },

  getByPost: async (url, data) => {
    let response = {};

    await axiosInstance.post(`${url}`, data).then((res) => {
      response = res.data;
    });

    return response;
  },

  getByDelete:async(url,id)=>{
    let response={}

    await axiosInstance.delete(`${url}/${id}`)
    .then(res=>{
        response=res.data
    })

    return response
  }
};
