"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CornerDownLeft } from 'lucide-react';


interface addItemProps {
    isOpen: boolean;
    onConfirm: (name: string, amount: number, people: string[]) => void;
    onCancel: () => void;
    people: string[];
}

const AddItem: React.FC<addItemProps> = ({ isOpen, onConfirm, onCancel, people}) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState<number | string>('');
    const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
    const [disableButton, setDisableButton] = useState(true);
    const [hasName, setHasName] = useState(true);
    const [hasAmount, setHasAmount] = useState(true);
    const [hasPerson, setHasPerson] = useState(true);

    const handleCheckedPerson = (person: string) => {
        setSelectedPeople(prevSelected => {
            if (prevSelected.includes(person)) {
                return prevSelected.filter(i => i !== person);
            } else {
                return [...prevSelected, person];
            }
        });
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setHasName(!!name);
        setHasAmount(!!amount);
        setHasPerson((selectedPeople.length > 0));


        if (name && amount && selectedPeople.length > 0) {
            onConfirm(name, +amount, selectedPeople);
        }
    };

    useEffect(() => {
        if (people.length > 0) {
            setDisableButton(false);
        }
    }, [people]);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <Card className="bg-white rounded-xl">
                        <CardHeader>
                            <CardTitle>Add Expense</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFormSubmit} autoComplete="off">
                                <div className="flex flex-col gap-4">
                                    <>
                                        <Label>Name</Label>
                                        <Input type="text" placeholder="Name" className={`${hasName ? "border-slate-300" : "border-red-400"} rounded-xl placeholder:text-slate-300`} onChange={e => setName(e.target.value)}></Input>
                                    </>
                                    <>
                                        <Label>Amount</Label>
                                        <Input type="text" placeholder="0.00" className={`${hasAmount ? "border-slate-300" : "border-red-400"} rounded-xl placeholder:text-slate-300`} onChange={e => setAmount(e.target.value)}></Input>
                                    </>
                                    <>
                                        <Label>People</Label>
                                        {people.length == 0 && <div className="w-48 mx-auto"><p className="text-sm text-slate-400 break-words text-center">Add a person to bill before adding expense!</p></div>}
                                        <div>
                                            {people.map((person, index) => (
                                                <div key={index} className={`${hasPerson ? "text-black" : "text-red-400"} flex flex-row gap-2 py-1 hover:text-slate-600`}>
                                                    <Checkbox id={person} onCheckedChange={() => handleCheckedPerson(person)} className="transition duration-200 rounded-lg hover:border-slate-600 data-[state=checked]:hover:bg-slate-800 data-[state=checked]:bg-slate-950 data-[state=checked]:text-slate-50"/>
                                                    <Label className="">{person}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                </div>
                                <div className="flex pt-10 gap-2">
                                    <button type="button" onClick={onCancel} className="w-1/4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-200 focus:outline-none">
                                        <CornerDownLeft className="text-gray-500"/>
                                    </button>
                                    <button disabled={disableButton} type="submit" className="w-3/4 px-4 py-2 bg-green-600 text-slate-50 rounded hover:bg-green-500 transition ease-out duration-200 disabled:bg-gray-300">
                                        Add Item
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}


export default AddItem;