import Supplement from "../interfaces/Supplement";

export default function sortDailyList(supplementList: {Supplement: Supplement, time: string}[]): {Supplement: Supplement, time: string}[] {
	const supplementListCopy = supplementList;
	let AMBucket: {Supplement: Supplement, time: string}[] = [];
	let PMBucket: {Supplement: Supplement, time: string}[] = [];
	let NoonMidnightBucket: {Supplement: Supplement, time: string}[] = [];
	const sortedBucket: {Supplement: Supplement, time: string}[] = [];

	// Make all time strings the same length
	Object.values(supplementListCopy).forEach(supplement => {
		if (supplement.time.length === 7) {
			supplement.time = "0"+supplement.time;
		}
	});

	// Sort times into PM and AM/No Time Set
	Object.values(supplementListCopy).forEach(supplement => {
		if (supplement.time.substring(6,7) === "P") {
			PMBucket.push(supplement);
		} else {
			AMBucket.push(supplement);
		}
	});

	// Push empty times into sorted list first
	Object.values(AMBucket).forEach(supplement => {
		if (supplement.time === "") {
			sortedBucket.push(supplement);
			AMBucket = AMBucket.filter(item => item !== supplement);
		}
	});

	// Midnight Sorting
	Object.values(AMBucket).forEach(supplement => {
		if (supplement.time.substring(0,2) === "12") {
			NoonMidnightBucket.push(supplement);
			AMBucket = AMBucket.filter(item => item !== supplement);
		}
	});
	// Compare tmp to each value in the MidnightList and push based on which is greater
	const Midnightlength = NoonMidnightBucket.length;
	if (Midnightlength > 0) {
		for (let i=0; i<Midnightlength; i++){
			let tmp = NoonMidnightBucket[0];
			
			Object.values(NoonMidnightBucket).forEach(supplement => {
				if (supplement.time.substring(0,5) === tmp.time.substring(0,5)) {
					if (supplement.Supplement.name < tmp.Supplement.name) {
						tmp = supplement;
					}
				}
				if (supplement.time.substring(0,5) < tmp.time.substring(0,5)) {
					tmp = supplement;
				}
			});
			sortedBucket.push(tmp);
			NoonMidnightBucket = NoonMidnightBucket.filter(item => item !== tmp);
		}
	}

	// Compare tmp to each value in the AMList and push based on which is greater
	const AMlength = AMBucket.length;
	for (let i=0; i<AMlength; i++){
		let tmp = AMBucket[0];

		Object.values(AMBucket).forEach(supplement => {
			if (supplement.time.substring(0,5) === tmp.time.substring(0,5)) {
				if (supplement.Supplement.name < tmp.Supplement.name) {
					tmp = supplement;
				}
			}
			if (supplement.time.substring(0,5) < tmp.time.substring(0,5)) {
				tmp = supplement;
			}
		});
		sortedBucket.push(tmp);
		AMBucket = AMBucket.filter(item => item !== tmp);
	}

	// Noon Sorting
	Object.values(PMBucket).forEach(supplement => {
		if (supplement.time.substring(0,2) === "12") {
			NoonMidnightBucket.push(supplement);
			PMBucket = PMBucket.filter(item => item !== supplement);
		}
	});
	// Compare tmp to each value in the NoonList and push based on which is greater
	const Noonlength = NoonMidnightBucket.length;
	if (Noonlength > 0) {
		for (let i=0; i<Noonlength; i++){
			let tmp = NoonMidnightBucket[0];
			
			Object.values(NoonMidnightBucket).forEach(supplement => {
				if (supplement.time.substring(0,5) === tmp.time.substring(0,5)) {
					if (supplement.Supplement.name < tmp.Supplement.name) {
						tmp = supplement;
					}
				}
				if (supplement.time.substring(0,5) < tmp.time.substring(0,5)) {
					tmp = supplement;
				}
			});
			sortedBucket.push(tmp);
			NoonMidnightBucket = NoonMidnightBucket.filter(item => item !== tmp);
		}
	}

	// Compare tmp to each value in the PMList and push based on which is greater
	const PMlength = PMBucket.length;
	for (let i=0; i<PMlength; i++){
		let tmp = PMBucket[0];
		
		Object.values(PMBucket).forEach(supplement => {
			if (supplement.time.substring(0,5) === tmp.time.substring(0,5)) {
				if (supplement.Supplement.name < tmp.Supplement.name) {
					tmp = supplement;
				}
			}
			if (supplement.time.substring(0,5) < tmp.time.substring(0,5)) {
				tmp = supplement;
			}
		});
		sortedBucket.push(tmp);
		PMBucket = PMBucket.filter(item => item !== tmp);
	}

	return sortedBucket;
}
