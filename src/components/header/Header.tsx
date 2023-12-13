import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const Header = () => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const savedCookie = cookie.get("jwt_token");

		if (savedCookie) {
			setIsLoggedIn(true);
		}
	}, []);
	const onLogOut = () => {
		cookie.remove("jwt_token");
		router.push("/login");
	};
	return (
		<header className={styles.header}>
			<nav className={styles.navbar}>
				<Link href="/" className={styles.logo}>
					Lithuania`s top locations
				</Link>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						<Link href="/add-location" className={styles.navLink}>
							Add Location
						</Link>
					</li>

					<li className={styles.navItem}>
						{isLoggedIn ? (
							<button className={styles.navLink} onClick={onLogOut}>
								Logout
							</button>
						) : (
							<Link href="/login" className={styles.navLink}>
								Login
							</Link>
						)}
					</li>

					{/* Add more navigation items as needed */}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
