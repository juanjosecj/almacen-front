'use client';
import Link from "next/link";
//import style from "./ActiveLink.module.css";
import { usePathname } from "next/navigation";
interface Props{
    path: string;
    text: string;
}

export const ActiveLink = ({path, text}: Props) =>{
    const pathname = usePathname();
    return (
        <Link className={`link ${(pathname === path) && 'active-link'}`} href={path}>{text}</Link>
    )
} 