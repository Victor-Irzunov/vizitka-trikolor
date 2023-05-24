// import Footer from "./Footer";
// import Header from "./header/Header";

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const Layout = ({ children }) => {
	return (
		<div className={`${inter.className} App relative`}>
			{/* <Header /> */}
			{children}
			{/* <Footer /> */}
		</div>
	)
}
export default Layout
