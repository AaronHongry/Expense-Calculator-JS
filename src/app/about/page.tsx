"use client";

export default function About() {
  return (
    <div className="bg-background flex flex-col min-h-screen">
      <div className="m-10 flex flex-col items-center">
        <h1 className="text-5xl font-semibold text-foreground">What is the Expense Calculator?</h1>
        <h2 className="my-4 mx-56 text-lg font-medium text-secondary-foreground indent-14">
          The Expense Calculator allows users to calculate the expenses owed by each person and divy up a bill in an organized matter.
          Deriving from my Expense Calculator program that I originally developed in Python, I wanted to develop a user-interface that
          is much easier to use than through typing commands. This project also serves as a way for me to learn React, Next.js, and TailwindCSS
          all at the same time!
        </h2>
      </div>
    </div>
  );
}
