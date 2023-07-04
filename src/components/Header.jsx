export const Header = () => {
	return (
		<nav id="header" className="bg-black text-white">
			<div className="container w-full mx-auto flex flex-wrap items-center justify-content-between mt-0 py-2">
				<div className="logo">
					<div className="logo_wrapper pl-4 flex items-center">
						<img src={"/"} alt="logo">
						</img>
					</div>
					<div className="nav-menu-wrapper flex items-center justify-between space-x-10">
						<div>Home</div>
						<div>About</div>
					</div>
					<div className="flex items-center justify-center space-x-4">
						<div>cart</div>
						<div>Log In</div>
						<div>Sign Up</div>
					</div>
				</div>

			</div>
		</nav>
	)
}