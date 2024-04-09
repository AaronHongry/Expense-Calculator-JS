"use client";

export default function Home() {
  return (
    <div className="bg-background flex flex-col min-h-screen">
      <div className="m-10 flex flex-col items-center">
        <h1 className="text-6xl font-semibold text-foreground">Welcome!</h1>
        <h2 className="m-5 text-lg font-medium text-secondary-foreground">
          <p>To get started, click on the Calculate page using the navigation buttons above!</p>
        </h2>
      </div>
    </div>
  );
}
