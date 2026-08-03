import { ModerationRejectionReason } from "../types/moderation";

export interface RejectionReasonOption {
    value: ModerationRejectionReason;
    label: string;
    description?: string;
}

export const REJECTION_REASON_OPTIONS: RejectionReasonOption[] = [
    {
        value: "SPAM",
        label: "Spam",
        description: "The content is unsolicited or repetitive.",
    },
    {
        value: "DUPLICATE",
        label: "Duplicate",
        description: "This content already exists.",
    },
    {
        value: "FALSE_INFORMATION",
        label: "False information",
        description: "The information provided is incorrect or misleading.",
    },
    {
        value: "OFFENSIVE_CONTENT",
        label: "Offensive content",
        description: "The content contains offensive language or imagery.",
    },
    {
        value: "INVALID_LOCATION",
        label: "Invalid location",
        description: "The selected location is incorrect.",
    },
    {
        value: "INSUFFICIENT_INFORMATION",
        label: "Insufficient information",
        description: "More information is required before approval.",
    },
    {
        value: "OTHER",
        label: "Other",
        description: "Another moderation reason.",
    },
];