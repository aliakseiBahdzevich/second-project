import { basename } from "path";
import axios from 'axios';

export type Classmate = {
  name: string;
  surname: string;
  age: number;
  gender: string;
  isCrazy: boolean;
  id?: string;
}

class Api {

  private baseUrl: string;
  private domain: string;
  private rootDomain: string;

  constructor ({baseUrl = 'https://ca3f9025bb5eff7996a3.free.beeceptor.com/api', domain = 'users'}) {
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

  async updateClassmates(id: string, classmate: Classmate) {
    const responce = await axios.put(this.rootDomain + '/' + id, classmate);
    return responce
  }



}

export default Api;




