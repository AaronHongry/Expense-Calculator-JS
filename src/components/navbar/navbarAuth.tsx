"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	getAdditionalUserInfo,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from 'react';

export const NavbarAuth: React.FC<{}> = () => {
	const googleProvider = new GoogleAuthProvider();

	const [user, loading] = useAuthState(auth);
    const [pfp, setPfp] = useState<string | null>("");

	const authenticate = async () => {
		const result = await signInWithPopup(auth, googleProvider);
		const additionalInfo = getAdditionalUserInfo(result);

		if (additionalInfo?.isNewUser) {
            console.log("new user");
			setDoc(doc(db, "users", result.user.uid), {
				name: result.user.email?.split("@")[0],
				dateJoined: new Date(),
				userid: result.user.uid
			});
		}
        setPfp(result.user.photoURL);
	};

	if (loading) return <></>;
	if (!user)
		return (
			<div className="">
				<button tabIndex={-1} className="px-4 py-4 bg-slate-50 text-green-600 font-semibold rounded-xl transition duration-200 ease-out hover:bg-green-600 hover:text-slate-50 hover:outline hover:outline-2 hover:outline-slate-50" onClick={authenticate}>Login or Register</button>
			</div>
		);
	return (
		<div className="flex flex-col items-end">
			<DropdownMenu>
				<DropdownMenuTrigger tabIndex={-1} className="focus:outline-none">
					<div className="flex px-4 py-2 items-center gap-2 text-green-600 bg-slate-50 rounded-xl transition duration-200 ease-out hover:bg-green-600 hover:outline hover:outline-2 hover:text-slate-50 hover:outline-slate-50 hover-border-avatar">
						<div className="text-md font-semibold transition duration-200 ease-out">{user.displayName}</div>
                        <Avatar id="avatar-component" className="border-2 border-green-600 transition duration-200 ease-out">
                            <AvatarImage src={pfp || undefined}/>
                            <AvatarFallback className="bg-slate-400 text-white">
                                {(user.displayName?.[0])}
                            </AvatarFallback>
                        </Avatar>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="bg-slate-50 w-44">
					<Link href={`../profile/${user.uid}`}><DropdownMenuItem className="focus:bg-slate-200">My Expenses</DropdownMenuItem></Link>
                    <DropdownMenuSeparator className="bg-slate-300" />
					<DropdownMenuItem className="focus:bg-slate-200" onClick={() => signOut(auth)}>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

		</div>
	);
};