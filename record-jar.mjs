export default class RecordJar extends Array{
	constructor(input){
		switch(typeof input){
			case "string":
				input = RecordJar.parse(input);
				break;
			case "object":
			case "undefined":
				if(null == input)
					input = [];
				else if(!(Symbol.iterator in input))
					input = [input];
				break;
			case "bigint":
				input = Number(input);
			case "number":
				if(!isFinite(input))
					throw new RangeError("Invalid array length");
				super(input);
				return;
		}
		super(...input);
	}


	/**
	 * Parse a string containing data formatted as a Record-Jar.
	 *
	 * @param {String} source
	 * @param {?String} [commentPrefix="#"]
	 *    String that identifies a comment line, which will be
	 *    ignored during parsing. Set to `null` to disable
	 *    comment-handling altogether.
	 * @return {Object[]}
	 * @static
	 */
	static parse(source, commentPrefix = "#"){
		const results = [];
		source = `${source}`;
		if(source.startsWith("\uFEFF"))
			source = source.slice(1);
		for(const chunk of source.split(/^%%$/m)){
			const record = {};
			let fieldCount = 0;
			for(let line of chunk.split(/(?:\r?\n|\r)(?! |\t)/)){
				if(line.startsWith(commentPrefix) || !line)
					continue;

				const index = line.indexOf(":");
				if(index < 1)
					throw new SyntaxError(`Malformed field: ${line}`);

				const key = line.slice(0, index).trim();
				const val = line.slice(index + 1).replace(/[ \t]*(?:\r?\n|\r)[ \t]+/g, " ").trim();
				record[key] = key in record && !Array.isArray(record[key]) ? [record[key], val] : val;
				++fieldCount;
			}
			// Ignore empty records
			fieldCount && results.push(record);
		}
		return results;
	}
}
