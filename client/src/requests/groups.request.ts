import axios from "axios";
import { IGroup } from '../models/groups.model'

export async function getGroups(url: string): Promise<IGroup[]> {
    try {
        const result = await axios.get(url)

        return result.data
    } catch (e) {
        throw(e)
    }
}