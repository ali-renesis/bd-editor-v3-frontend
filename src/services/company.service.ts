import { HttpService } from './base.service'

class CompanyServices extends HttpService {
  private readonly prefix: string = "company-detail";

  /**
   * Create Company Detail
   * @paramdata
   */
  addCompanyDetail = (data: any): Promise<any> => this.post(`${this.prefix}/add`, data);

  /**
   * Update Company Detail
   * @param id 
   * @param data 
   * @returns 
   */
  updateCompanyDetail = (id: any, data: any): Promise<any> => this.put(`${this.prefix}/${id}`, data);

}

export const companyServices = new CompanyServices();