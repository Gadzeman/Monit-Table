import axios from "axios";
import { Group } from '../models/groups.model'

export async function getGroups(url: string): Promise<Group[]> {
    try {
        const { data } = await axios.get(url)

        return data.data
    } catch (e) {
        throw(e)
    }
}