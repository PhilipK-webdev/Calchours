import axios from "axios";

export default {
    setMonth: (obj) => axios.post("users/usercalendar", obj),
    getMonth: (id) => axios.get("/usercalendar/one/" + id)
};