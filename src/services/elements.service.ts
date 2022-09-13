import { HttpService } from './base.service'

class ElementServices extends HttpService {
  private readonly prefix: string = "elements";

  /**
   * Create Company Detail
   * @paramdata
   */
  getElements = (data: any): Promise<any> => this.get(`${this.prefix}`, data);


/**
 * 
 * @param url 
 * @returns 
 */
  getImageFromS3 = (url: any): Promise<any> => this.get(`${this.prefix}/image?url=${url}`,);

  /**
   * Update Company Detail
   * @param id 
   * @param data 
   * @returns 
   */
  updateCompanyDetail = (id: any, data: any): Promise<any> => this.put(`${this.prefix}/${id}`, data);

}

export const elementServices = new ElementServices();