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

export const NavbarAuth: React.FC<{}> = () => {
	const googleProvider = new GoogleAuthProvider();

	const [user, loading] = useAuthState(auth);

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
	};
	if (loading) return <></>;
	if (!user)
		return (
			<div className="">
				<button className="px-4 py-2 bg-slate-50 text-green-600 font-semibold rounded-xl transition duration-200 ease-out hover:bg-green-600 hover:text-slate-50 hover:outline hover:outline-2 hover: outline-slate-50" onClick={authenticate}>Login or Register</button>
			</div>
		);
	return (
		<div className="flex flex-col items-end">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<div className="flex outline outline-2  px-4 py-2 items-center gap-2">
						<div className="text-md text-slate-50">{user.displayName}</div>
						<Avatar>
                            <AvatarImage src={user.photoURL || undefined}/>
                            
                            <AvatarFallback className="bg-slate-400 text-white">
                                {(user.displayName[0])}
							</AvatarFallback>
						</Avatar>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href={`../profile/${user.uid}`}><DropdownMenuItem>My Expenses</DropdownMenuItem></Link>
					<DropdownMenuItem onClick={() => signOut(auth)}>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

		</div>
	);
};