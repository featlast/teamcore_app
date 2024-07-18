import { TOKE_API } from "@env";
import ApiManager from "./apimanager";

//get getDataForm
export const getDataForm = async () => {
  try {
    const response = await ApiManager('questions', {
      method: 'GET',
      headers: {Authorization: `Bearer ${TOKE_API}`},
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

//ppost DataForm
export const sendDataForm = async (data:unknown) => {
  console.log('DATA BACKEND=>',JSON.stringify(data,null,2));
  try {
    const response = await ApiManager('answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKE_API}`
      },
      data:JSON.stringify(data)
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
