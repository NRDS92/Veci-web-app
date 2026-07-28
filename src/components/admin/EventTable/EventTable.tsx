import { AdminEvent } from "@/features/admin/types/event";
import EventRow from "../EventRow/EventRow";

interface Props {
  events: AdminEvent[];
  onView: (event: AdminEvent) => void;
}

export default function EventTable({
  events,
  onView,
}: Props) {
  if (events.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No events found.
      </div>
    );
  }

  return (
    <table className="w-full border-collapse">

      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-3 text-left">Image</th>
          <th className="px-4 py-3 text-left">Title</th>
          <th className="px-4 py-3 text-left">City</th>
          <th className="px-4 py-3 text-left">Status</th>
          <th className="px-4 py-3 text-left">Date</th>
          <th className="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>

        {events.map((event) => (
          <EventRow
            key={event._id}
            event={event}
            onView={onView}
          />
        ))}

      </tbody>

    </table>
  );
}