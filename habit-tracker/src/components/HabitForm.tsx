import { Button } from "./Button";

export function HabitForm() {
  return (
    <form className="flex gap-2">
      <input className="flex gap-2" placeholder="New habit..." />
      <Button className="rounded-lg px-4 py-2 font-medium">Add Habit</Button>
    </form>
  );
}
