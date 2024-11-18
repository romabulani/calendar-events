import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import { setupUser } from "../services";
import { IAuthResponse, IAuthUser } from "../types";
import { toast } from "react-toastify";

interface IAuthHandlerProps {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent;
  setData: (user: IAuthUser) => void;
  data: IAuthUser;
  isGuest?: boolean;
  isSignup?: boolean;
}

export const useAuthHandler = () => {
  const { setAuthToken, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const authHandler = async ({
    e,
    setData,
    data,
    isGuest,
    isSignup,
  }: IAuthHandlerProps) => {
    if (e) e.preventDefault();
    let response: IAuthResponse | null;
    try {
      if (isGuest) {
        setData({
          email: "johndoe@gmail.com",
          password: "johndoe@123",
        });
        response = await setupUser("johndoe@gmail.com", "johndoe@123", true);
      } else {
        response = await setupUser(data.email, data.password, !isSignup);
      }

      if (response?.user) {
        const tokenResponse = response.user.token;
        const foundUser = {
          id: response.user._id,
          email: response.user.email,
        };
        setAuthToken(tokenResponse);
        setAuthUser(foundUser);
        localStorage.setItem("authToken", tokenResponse);
        localStorage.setItem("authUser", JSON.stringify(foundUser));
        navigate("/");
      }
    } catch (e: any) {
      console.error("authHandler: Error in setting user up", e);
    }
  };
  return { authHandler };
}
