import { HttpService } from "./base.service";

class UserService extends HttpService {
  private readonly prefix: string = "user";

  /**
   * Update User
   * @paramdata
   */
  updateProfile = (data: any): Promise<any> =>
    this.put(`${this.prefix}/update`, data);


  getUserProfile = (): Promise<any> =>
    this.get(this.prefix + `/profile`);

  /**
   * Get UnSeen Notifications
   * @returns 
   */
  logout = (): Promise<any> => this.post("auth" + `/logout`, {});

}

export const userService = new UserService();
