import { SettingsForm } from "./_components/SettingsForm";

export default function Settings() {
  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto px-6 py-8">
        <h1 className="mb-6 text-3xl font-semibold">Settings</h1>
        <SettingsForm />
      </div>
    </main>
  );
}
