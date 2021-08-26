import { Movie } from "./movie";

export class MovieDBResponse {
    dates: Date[];
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}