import type { NextPage } from 'next'
import { pagesPath } from "../lib/$path";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Link href={pagesPath.tests.$url()}>テスト一覧</Link>
  )
}

export default Home
