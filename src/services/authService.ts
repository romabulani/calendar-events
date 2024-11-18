import axios from "axios";
import { API_URL, showError, showSuccess } from "../utils";
import { IAuthResponse } from '../types';


async function setupUser(email: string, password: string, isLogin?: boolean): Promise<IAuthResponse | null> {
  try {
    const response = await axios.post(`${API_URL}/${isLogin ? "login" : "signup"}`, {
      email: email,
      password: password,
    });
    showSuccess(response)
    return response.data;
  } catch (e) {
    console.error("loginService: Error in Login", e);
    showError(e);
    return null;
  }
}

export { setupUser };
