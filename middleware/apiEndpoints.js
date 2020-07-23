import axios from "axios";

export async function getMaleBreeds() {
  return helperFunctionGET("/api/breeds?breeds?male=1");
}

export async function getFemaleBreeds() {
  return helperFunctionGET("/api/breeds?breeds?female=1");
}

export async function getChristmasBreeds() {
  return helperFunctionGET("/api/breeds?holiday=christmas");
}

export function getHalloweenBreeds() {
  return helperFunctionGET("/api/breeds?holiday=halloween");
}

export function getValentineBreeds() {
  return helperFunctionGET("/api/breeds?holiday=valentine");
}

async function helperFunctionGET(url) {
  try {
    const response = await axios.get(`${process.env.SITE}${url}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
