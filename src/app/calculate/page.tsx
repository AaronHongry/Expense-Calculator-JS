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

export default function Calculate() {
  return (
    <div className="bg-background flex flex-col min-h-full p-6 ">
      <div className="flex flex-row justify-center gap-3 px-40">
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle className="text-slate-950">Expenses</CardTitle>
            <CardDescription className="text-slate-400">Add Items on the Receipt</CardDescription>
            <Separator className="bg-slate-300"/>
          </CardHeader>

          <CardContent className="flex justify-center">
            <CardDescription className="text-slate-400">There are no items in the receipt!</CardDescription>
          </CardContent>

          <CardContent>
            <Separator className="bg-slate-300"/>
            <div className="flex flex-row justify-between items-center py-2">
              <p className="font-medium text-xl">Total</p>
              <p className="font-extrabold text-2xl">$0.00</p>
            </div>
          </CardContent>              
        </Card>

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="text-slate-950">People</CardTitle>
            <CardDescription className="text-slate-400">Add People in the Bill</CardDescription>
            <Separator className="bg-slate-300"/>
          </CardHeader>    
        

          <CardContent className="flex justify-center">
              <CardDescription className="text-slate-400">There are no people in the bill!</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}