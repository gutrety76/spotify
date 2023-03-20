import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (

        <div>

            <div
                className="col-span-1 p-4 gap-y-2 pt-12 font-[400] text-[18px]  text-white flex flex-col justify-center  items-left bg-black ">

                <Link href={`/`}><span
                    className="cursor-pointer text-gray-300 hover:text-white flex items-center justify-start duration-75"><Image src={`/homeIcon.svg`} width={40} height={40}/><span>Главная</span></span>
                </Link>
                <Link href={`/myfavoritesong`}><span
                    className="cursor-pointer text-gray-300 hover:text-white flex items-center justify-start duration-75"><Image src={`/likedIcon.svg`} width={40} height={40}/><span>Любимые треки</span></span>
                </Link>
                <Link href={`https://github.com`}><span
                    className="cursor-pointer text-gray-300 hover:text-white flex items-center justify-start duration-75"><Image className="p-2.5" src={`/github.svg`} width={40} height={40}/><span>Github</span></span>
                </Link>
                <Link href={`/contacts`}><span
                    className="cursor-pointer text-gray-300 hover:text-white flex items-center justify-start duration-75"><Image src={`/likedIcon.svg`} width={40} height={40}/><span>Контакты</span></span>
                </Link>
                <Link href={`http://portfolio.com`}><span
                    className="cursor-pointer text-gray-300 hover:text-white flex items-center justify-start duration-75"><Image className="rounded-[180px] p-2.5" src={`/contacts.svg`} width={40} height={40}/><span>Портфолио</span></span>
                </Link>


            </div>
        </div>)
}