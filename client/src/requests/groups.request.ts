import axios from "axios";
import { IGroup } from '../models/groups.model'

export async function getGroups(url: string): Promise<IGroup[]> {
    try {
        const { data } = await axios.get(url)

        return data
    } catch (e) {
        throw(e)
    }
}