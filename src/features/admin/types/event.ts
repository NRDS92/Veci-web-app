export type ModerationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface AdminEvent {
  _id: string;
  title: string;
  description: string;
  category: string;
  cityId: string;
  images: string[];
  dateStart: string;

  moderation: {
    status: ModerationStatus;
  };

  createdBy?: {
    _id: string;
    name: string;
  };
}