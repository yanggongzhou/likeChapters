export interface IBookListItem {
  author: string;
  bookIntro?: string;
  bookName: string;
  ctime: number;
  id: string;
  status: number;
  userId: string;
  bookCover?: string;
}

export interface IBookParams {
  id?: string;
  bookName: string;
  bookIntro?: string;
  bookCover?: string;
}
