export interface IChapterListItem {
  id: string;
  bookId: string;
  chapterName: string;
  chapterIntro?: string;
}

export interface IChapterParams {
  id?: string;
  bookId: string;
  chapterName: string;
  chapterIntro?: string;
}
