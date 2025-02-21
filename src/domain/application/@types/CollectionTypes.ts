import ReadingStatus from "@/domain/core/ReadingStatus";

export type CollectionUpdateOperation = "insert" | "remove" | "update";

export type CollectionBookFromRequest = {
  book_id: string;
  operation: CollectionUpdateOperation;
  status?: ReadingStatus;
};

export type CollectionInput = {
  id: string;
  books_collection: CollectionBookFromRequest[];
};

export type DBCollectionBook = {
  book_id: string;
  title: string;
  author: string[];
  status: string;
};

export type DBOutputCollectionData = {
  _id: string;
  title: string;
  description: string;
  visibility: "public" | "private";
  books_collection: DBCollectionBook[];
  owner: string;
};

export type ColletionInputData = {
  title: string;
  description: string;
  visibility: "public" | "private";
  books_collection: { book_id: string; status: string }[];
  owner: string;
};

export type InputCollectionInfoUpdate = {
  collection_id: string;
  update_fields: {
    title?: string;
    description?: string;
    visibility?: "public" | "private";
  };
};
