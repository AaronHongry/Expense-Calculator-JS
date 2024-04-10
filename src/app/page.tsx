"use client";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="m-10 flex flex-col items-center">
        <h1 className="text-6xl font-semibold text-gray-950">Welcome!</h1>
        <h2 className="m-5 text-lg font-medium text-gray-800">
          <p>To begin sorting your expenses, log in or register!</p>
        </h2>
      </div>
    </div>
  );
}
