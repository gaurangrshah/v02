import type { Metadata } from 'next';

import { Settings } from './_components/settings';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  }
}

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="space-y-4 my-4">
        <div>
          <h3 className="text-lg font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
        </div>
        <Settings />
      </div>
    </div>
  );
}
