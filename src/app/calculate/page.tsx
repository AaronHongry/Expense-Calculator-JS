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
import AddItem from "@/components/addItem";
import AddPerson from "@/components/addPerson";

interface ExpenseProps {
  name: string;
  amount: number;
  people: string[];
}

function Expense({name, amount, people}: ExpenseProps) {
  return (
     <div className="grid grid-cols-5 gap-4 py-2 w-full">
      <p className="text-lg text-slate-950 col-span-1 font-bold">{name}</p>
      <Separator orientation="vertical" className="bg-slate-300 col-span-1"/>
      <div className="col-span-1 justify-self-center">
        {people.map((person, index) => (
            <React.Fragment key={index}>
              <span className="text-md font-medium text-slate-500 inline-block">{person}</span>
              {(index != people.length - 1) && <span className="text-slate-500">, </span>}
            </React.Fragment>
          ))}
      </div>
      <Separator orientation="vertical" className="bg-slate-300 col-span-1 justify-self-end"/>
      {amount > 0 ? <p className="text-lg text-slate-950 col-span-1 justify-self-end font-bold">${amount.toFixed(2)}</p> : <p className="text-lg text-slate-950 col-span-1 justify-self-end font-bold">-${(amount * -1).toFixed(2)}</p>}
    </div> 
  );
}

interface PeopleProps {
  name: string;
  amount: number;
}

function People({name, amount}: PeopleProps) {
  return (
    <>
      <Card className="grid grid-cols-3 p-2 px-4">
        <h2 className="text-xl text-slate-950 font-bold col-span-1">{name}</h2>
        <Separator orientation="vertical" className="col-span-1 bg-slate-300 justify-self-end"/>
        <h2 className="text-xl text-slate-950 font-bold col-span-1 justify-self-end">${amount.toFixed(2)}</h2>
      </Card>
    </>
  );
}

export default function Calculate() {
  const [total, setTotal] = useState(0.0);
  const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
  const [people, setPeople] = useState<PeopleProps[]>([]);

  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);

  const handleOpenAddItem = () => setIsAddItemOpen(true);
  const handleCloseAddItem = () => setIsAddItemOpen(false);

  const handleOpenAddPerson = () => setIsAddPersonOpen(true);
  const handleCloseAddPerson = () => setIsAddPersonOpen(false);

  const handleAddItem = (name: string, amount: number, people: string[]) => {
    setExpenses(prevItems => [...prevItems, {name, amount, people}])
    handleCloseAddItem();
  };

  const handleAddPerson = (name: string) => {
    setPeople(prevItems => [...prevItems, {name, amount: 0.0}]);
    handleCloseAddPerson();
  };

  useEffect(() => {
    const updatedPeople = people.map(person => {
      let totalAmount = 0.0;
      const includedExpenses = expenses.filter(expense => {
        return expense.people.includes(person.name)
      });
      includedExpenses.forEach(expense => {
        totalAmount += Math.round((expense.amount / expense.people.length) * 100) / 100;
        console.log(`${person.name}: ${expense.name} ${Math.round((expense.amount / expense.people.length) * 100) / 100}`);
      });
      return {...person, amount: totalAmount};
    });
    setPeople(updatedPeople);

    const newTotal = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotal(Math.round(newTotal * 100) / 100);
  }, [expenses]);

  return (
    <div className="bg-background flex flex-col min-h-full p-6 ">
      <div className="flex flex-row justify-center gap-3 px-40">
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle className="text-slate-950 font-bold">Expenses</CardTitle>
            <CardDescription className="text-slate-400">Add Expenses on the Receipt</CardDescription>
            <Separator className="bg-slate-300"/>
          </CardHeader>

          <CardContent className="flex flex-col justify-center items-center">
            {expenses.length == 0 && <CardDescription className="text-slate-400 w-full text-center pb-2">There are no expenses in the receipt!</CardDescription>}

            {expenses.map((expense, index) => (
              <React.Fragment key={index}>
                <Expense key={index} name={expense.name} amount={expense.amount} people={expense.people}/>
                <Separator className="bg-slate-200"/>
              </React.Fragment>
            ))}

            <button className="mt-5 px-4 py-2 w-1/5 bg-green-600 text-slate-50 rounded-3xl hover:bg-green-500 transition ease-out duration-200" onClick={handleOpenAddItem}>Add Expense</button>
            {isAddItemOpen && <AddItem isOpen={isAddItemOpen} onConfirm={handleAddItem} onCancel={handleCloseAddItem} people={people.map(a => a.name)}/>}
          </CardContent>

          <CardContent>
            <Separator className="bg-slate-300"/>
            <div className="flex flex-row justify-between items-center py-2">
              <p className="font-bold text-xl text-slate-950">Total</p>
              <p className="font-extrabold text-2xl text-slate-950">${total.toFixed(2)}</p>
            </div>
          </CardContent>              
        </Card>

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="text-slate-950 font-bold">People</CardTitle>
            <CardDescription className="text-slate-400">Add People in the Bill</CardDescription>
            <Separator className="bg-slate-300"/>
          </CardHeader>    
        

          <CardContent className="flex flex-col justify-center items-center">
            {people.length == 0 && <CardDescription className="text-slate-400 w-full text-center pb-2">There are no people in the bill!</CardDescription>}

            <div className="flex flex-col w-full gap-3 pb-5">
              {people.map((person, index) => (
                <React.Fragment key={index}>
                  <People name={person.name} amount={person.amount}/>
                </React.Fragment>
              ))}
            </div>

            <button className="px-4 py-2 w-3/5 bg-green-600 text-slate-50 rounded-3xl hover:bg-green-500 transition ease-out duration-200" onClick={handleOpenAddPerson}>Add Person</button>
            {isAddPersonOpen && <AddPerson isOpen={isAddPersonOpen} onConfirm={handleAddPerson} onCancel={handleCloseAddPerson}/>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}