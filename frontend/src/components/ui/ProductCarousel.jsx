import { Carousel, IconButton } from "@material-tailwind/react";
import {
	IconArrowRight,
	IconBounceRightFilled,
	IconCaretLeftFilled,
	IconCaretRightFilled,
	IconMoodSadFilled,
} from "@tabler/icons-react";

export function ProductCarousel(props) {
	const images = props.images;
	return (
		<Carousel
			className="rounded-xl"
			autoplay={true}
			autoplayDelay={2000}
			loop={true}
			prevArrow={({ handlePrev }) => (
				<IconButton
					variant="text"
					color="white"
					size="lg"
					onClick={handlePrev}
					className="!absolute top-2/4 left-4 -translate-y-2/4 bg-white opacity-40"
				>
					<IconCaretLeftFilled className="text-black" />
				</IconButton>
			)}
			nextArrow={({ handleNext }) => (
				<IconButton
					variant="text"
					color="white"
					size="lg"
					onClick={handleNext}
					className="!absolute top-2/4 !right-4 -translate-y-2/4 p-4 bg-white opacity-40 glass"
				>
					<IconCaretRightFilled className="text-black" />
				</IconButton>
			)}
		>
			{images && images.length > 0 ? (
				images.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`image ${index + 1}`}
						className="h-full w-full object-cover rounded-xl"
					/>
				))
			) : (
				<div className="flex justify-center h-32 min-h-16">
					<IconMoodSadFilled className="text-9xl" />
				</div>
			)}
		</Carousel>
	);
}
