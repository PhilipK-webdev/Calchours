import axios from "axios"

export default {
    setMonth: (obj) => axios.get("/usercalendar" + obj),
    getMonth: (id) => axios.get("/usercalendar/one/" + id)
};