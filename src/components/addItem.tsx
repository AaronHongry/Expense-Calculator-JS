"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CornerDownLeft } from 'lucide-react';

interface addItemProps {
    isOpen: boolean;
    onConfirm: (name: string, amount: number) => void;
    onCancel: () => void;
}

const AddItem: React.FC<addItemProps> = ({ isOpen, onConfirm, onCancel }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState<number | string>('');

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (name && amount) {
            onConfirm(name, +amount);
        }
    };

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
                                    <div>
                                        <Label>Name</Label>
                                        <Input type="text" placeholder="Name" className="rounded-xl border-slate-300 placeholder:text-slate-300" onChange={e => setName(e.target.value)}></Input>
                                    </div>
                                    <div>
                                        <Label>Amount</Label>
                                        <Input type="text" placeholder="0.00" className="rounded-xl border-slate-300 placeholder:text-slate-300" onChange={e => setAmount(e.target.value)}></Input>
                                    </div>
                                </div>
                                <div className="flex pt-10 gap-2">
                                    <button onClick={onCancel} className="w-1/4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-200 focus:outline-none">
                                        <CornerDownLeft className="text-gray-500"/>
                                    </button>
                                    <button type="submit" className="w-3/4 px-4 py-2 bg-green-600 text-slate-50 rounded hover:bg-green-500 transition ease-out duration-200">
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