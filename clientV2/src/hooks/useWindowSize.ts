import { useState, useEffect } from "react";

export type TWindowSize = {
	width: number | undefined;
	height: number | undefined;
};

const useWindowSize = (): TWindowSize => {
	const isWindowClient: boolean = typeof window === "object";

	const [windowSize, setWindowSize] = useState<TWindowSize>({
		width: isWindowClient ? window.innerWidth : undefined,
		height: isWindowClient ? window.innerHeight : undefined,
	});

	// add event listener for window resize event
	useEffect(() => {
		//a handler which will be called on change of the screen resize
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		if (isWindowClient) {
			//register the window resize listener
			window.addEventListener("resize", handleResize);

			//un-register the listener
			return () => window.removeEventListener("resize", handleResize);
		}
	}, [isWindowClient, setWindowSize]);
	//☝️

	return windowSize as TWindowSize;
};

export { useWindowSize };
