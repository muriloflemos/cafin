export class PaginatedDTO<T> {
  constructor(
    public count: number,
    public data: T[],
  ) {}
}
