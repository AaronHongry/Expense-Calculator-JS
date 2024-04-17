"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";

interface ExpenseProps {
  name: string;
  amount: number;
}

function Expense({name, amount}: ExpenseProps) {
  return (
     <div className="flex flex-row justify-between py-2 w-full">
      <p className="text-md text-slate-950">{name}</p>
      <p className="text-md text-slate-950">${amount}</p>
    </div> 
  );
}

export default function Calculate() {
  const [total, setTotal] = useState(0.0);


  const expenses = [
    { name: "Chicken", amount: 50.99},
    { name: "Soju", amount: 20.99},
    { name: "Fries", amount: 15.99}
  ];

  useEffect(() => {
    const newTotal = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotal(newTotal);
  }, [expenses]);

  return (
    <div className="bg-background flex flex-col min-h-full p-6 ">
      <div className="flex flex-row justify-center gap-3 px-40">
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle className="text-slate-950">Expenses</CardTitle>
            <CardDescription className="text-slate-400">Add Items on the Receipt</CardDescription>
            <Separator className="bg-slate-300"/>
          </CardHeader>

          <CardContent className="flex flex-col justify-center items-center">
            {expenses.length == 0 && <CardDescription className="text-slate-400 w-full text-center pb-2">There are no items in the receipt!</CardDescription>}

            {expenses.map((expense, index) => (
              <React.Fragment key={index}>
                <Expense key={index} name={expense.name} amount={expense.amount}/>
                <Separator className="bg-slate-200"/>
              </React.Fragment>
            ))}

            <button className="mt-5 px-4 py-2 w-1/5 bg-green-600 text-slate-50 rounded-3xl hover:bg-green-500 transition ease-out duration-200">Add Item</button>
          </CardContent>

          <CardContent>
            <Separator className="bg-slate-300"/>
            <div className="flex flex-row justify-between items-center py-2">
              <p className="font-medium text-xl text-slate-950">Total</p>
              <p className="font-extrabold text-2xl text-slate-950">${total}</p>
            </div>
          </CardContent>              
        </Card>

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="text-slate-950">People</CardTitle>
            <CardDescription className="text-slate-400">Add People in the Bill</CardDescription>
            <Separator className="bg-slate-300"/>
          </CardHeader>    
        

          <CardContent className="flex flex-col justify-center items-center">
            <CardDescription className="text-slate-400 w-full text-center pb-2">There are no people in the bill!</CardDescription>
            <button className="px-4 py-2 w-3/5 bg-green-600 text-slate-50 rounded-3xl hover:bg-green-500 transition ease-out duration-200">Add Person</button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}