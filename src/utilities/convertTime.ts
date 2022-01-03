
export default function convertTime(currentDate: Date) {
	let timeTag = "AM";
	let hour = ""+currentDate.getHours();
	let minutes = ""+currentDate.getMinutes();
	if (currentDate.getHours() > 11) {
		timeTag = "PM";
		if (currentDate.getHours() > 12) {
			const hourTmp = currentDate.getHours() - 12;
			hour = ""+hourTmp;
		}
	}
	if (currentDate.getHours() === 0) {
		hour = "12";
	}
	if (currentDate.getMinutes() < 10) {
		minutes = "0"+ ""+currentDate.getMinutes();
	}

	// 12:32_PM
	// 01234567
	return hour + ":" + minutes + " " + ""+timeTag;
}
