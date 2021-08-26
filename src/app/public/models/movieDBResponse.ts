import { Movie } from "./movie";

export class MovieDBResponse {
    dates: Date[] = [];
    page: number = 0;
    results: Movie[] = [];
    total_pages: number = 0;
    total_results: number = 0;
}