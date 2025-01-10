import { FormCalendar } from "./_components/FormCalendar";

export default function Calendar() {
  return (
    <section className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto px-6 py-8">
        <h1 className="mb-6 text-3xl font-semibold">Calendar</h1>
        <FormCalendar />
      </div>
    </section>
  );
}
