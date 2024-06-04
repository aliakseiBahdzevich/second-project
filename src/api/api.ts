import { basename } from "path";
import axios from 'axios';

export type Classmate = {
  name: string;
  surname: string;
  age: number;
  sex: string;
  isCrazy: boolean;
  id?: string;
}

class Api {

  private baseUrl: string;
  private domain: string;
  private rootDomain: string;

  constructor ({baseUrl = 'https://ca445a601cd5b0be4db6.free.beeceptor.com/api', domain = 'cls'}) {
    this.baseUrl = baseUrl;
    this.domain = domain;
    this.rootDomain = baseUrl + '/' + domain;
  }

  async getClassmates() {
    const responce = await axios.get(this.rootDomain);
    return responce;
  }

  async setClassmates(classmate: Classmate) {
    const responce = await axios.post(this.rootDomain, classmate);
    return responce;
  }

  async delClassmates(id: string) {
    const responce = await axios.delete(this.rootDomain + '/' + id);
    return responce;
  }



}

export default Api;




