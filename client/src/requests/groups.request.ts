import axios from 'axios';
import { Group } from '../models/group.model';

export async function getGroups(url: any): Promise<Group[]> {
  const { data } = await axios.get(url);

  return data.data;
}
