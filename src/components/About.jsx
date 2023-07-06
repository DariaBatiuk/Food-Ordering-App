import aboutImage from "../assets/images/about-image.png";

export const About = () => {
	return (
		<div className="bg-white">
			<div className="p-24 grid grid-cols-2">
				<div className="">
					<h2 className="text-2xl font-meduim"> About Us</h2>
					<p className="text-lg">
						!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
					</p>
				</div>
				<div className="flex items-center justify-center">
					<img src={aboutImage} about="about" className=""></img>
				</div>
			</div>
		</div>
	)
}