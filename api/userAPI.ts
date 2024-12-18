import axios from "axios";
import { SuperQueries } from "./SuperQueries";
import { LoginUserDto } from "../entities/LoginUserDto";
import { SignupUserDto } from "../entities/SignupUserDto";


export class UserAPI extends SuperQueries {
  static authUrl = super.baseUrl + "auth";


  static async login(loginUserDto: LoginUserDto) {
    console.log(this.authUrl)
    try {
      const token = await axios.post(this.authUrl + "/login", loginUserDto);
      const response = await this.getProfile(token.data);
      return {user: response, token: token.data};
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getProfile(token:string) {
    console.log("user api 26", token)

    try {
      const response = await axios.get(this.authUrl + "/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log("error login",this.authUrl, error);
      throw error;
    }
  }


  static async signup(signupUserDto: SignupUserDto) {
    try {
      const signupUser = await axios.post(this.authUrl + "/signup", signupUserDto);

      const loginObject: LoginUserDto = {
        email: signupUserDto.email,
        password: signupUserDto.password
      };
      const token = await axios.post(this.authUrl + "/login", loginObject);

      return {user: signupUser.data, token: token.data};
    } catch (error) {
      console.log("error signup", error);
      throw error;
    }
  }

  static async logout() {
    // delete the token from local storage

}
}