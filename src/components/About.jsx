import aboutImage from "../assets/images/about-image.png";

export const About = () => {
	return (
		<div className="bg-white" id="about">
			<div className="p-24 grid grid-cols-2">
				<div className="">
					<h2 className="text-2xl font-meduim"> About Us</h2>
					<p className="text-lg">
					Welcome to Delicious Kitchen, your ultimate destination for
            mouthwatering pizzas delivered right to your doorstep! We take pride
            in offering a delectable assortment of pizzas crafted with love and
            care, each bite guaranteed to transport your taste buds on a
            culinary adventure.  
						<br></br>
						At Delicious Kitchen, we believe that pizza is
            more than just a dish; it's an experience that brings people
            together. Whether you're indulging in a solo treat or hosting a
            lively gathering, our pizzas are designed to cater to your cravings
            and create lasting memories.
					</p>
				</div>
				<div className="flex items-center justify-center">
					<img src={aboutImage} alt="about" className="w-[400px] h-[400px] object-cover"></img>
				</div>
			</div>
		</div>
	)
}

export default About;