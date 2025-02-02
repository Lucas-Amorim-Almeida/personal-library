import { DBCollectionBook } from "@/domain/application/@types/CollectionTypes";

export default interface ICollection {
  title: string;
  description: string;
  visibility: "public" | "private";
  collection: DBCollectionBook[];
  owner: string; //user_id
  created_at?: Date;
  updated_at?: Date;
}
