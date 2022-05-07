import {useFetch} from "./useFetch";
import {ICharacter} from "../types/character";
import {API_URL} from "../constants/constants";

export const useFetchCharacters = () => {
    const { data, error } = useFetch<{ results: ICharacter[] }>(
        API_URL
    );

    const parsedData = data?.results.map(({ name, height }) => ({
        name,
        height: Number(height),
    })) ?? [];
    return { data:parsedData, error };
}