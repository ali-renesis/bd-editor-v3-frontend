import { HttpService } from './base.service'

class AuthService extends HttpService {
  private readonly prefix: string = "auth";
  private readonly user_prefix: string = "user";

  /**
   * Basic Authenticate User
   * @paramdata
   */
  login = (data: any): Promise<any> => this.post(`${this.prefix}/login`, data);

  /**
   * 
   * @param data 
   * @returns 
   */
  forgetPassword = (data: any): Promise<any> => this.post(this.prefix + "/forget-password", data);

  /**
   * 
   * @param data 
   * @returns 
   */
  verifyResetUrlPassword = (data: any): Promise<any> => this.post(this.prefix + "/verify-reset-url", data);

  /**
   * 
   * @param data 
   * @returns 
   */
  resetPassword = (data: any): Promise<any> => this.post(this.prefix + "/resetPassword", data);

  /**
   * 
   * @param data 
   * @returns 
   */
  register = (data: any): Promise<any> =>
    this.post(this.prefix + "/signup", data);

  /**
   * 
   * @returns 
   */
  googleRegister = (): Promise<any> => this.get(this.prefix + "/google");

  /**
   * 
   * @returns 
   */
  me = (): Promise<any> => this.get(this.prefix + "/me");

  /**
   * 
   * @param data 
   * @returns 
   */
  updateUser = (data: any): Promise<any> =>
    this.put(this.user_prefix + "/update", data);
}

export const authService = new AuthService();