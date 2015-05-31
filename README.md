Record-Jar
==========

A self-contained JavaScript class for parsing and packing data in the so-called "record-jar" metaformat.


#### The what?
This is a "record-jar":

```text
Planet: Mercury
Orbital-Radius: 57,910,000 km
Diameter: 4,880 km
%%
Planet: Venus
Orbital-Radius: 108,200,000 km
Diameter: 12,103.6 km
%%
Planet: Earth
Orbital-Radius: 149,600,000 km
Mass: 5.972e24 kg
Moons: Luna
```

You might've already seen this format if you've perused the [IANA subtag registry](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry). The registry lists every [IETF language tag](http://en.wikipedia.org/wiki/IETF_language_tag) available for identifying the language of web documents, and is perhaps the most frequently-referenced example of a record-jar file.

If the term's unfamiliar to you, it probably brought to mind some arcane compression format, or something to do with Java executables (`my-sick-program.jar`). The term was actually coined by Eric S. Raymond in his excellent book, *The Art of UNIX Programming* (p.116) whilst describing various data file metaformats. The name "Record-Jar" was derived from the "Cookie-Jar" metaformat, which listed quotes that were selected at random by the `fortune` program. Each quote was delimited by a newline-separated `%%` or `%`, which left the data it sandwiched easy to parse:

```txt
"Simple cookie-jar format is appropriate for pieces of text that have no
natural ordering, distinguishable structure above word level, or search keys
other than their text context."
	-- Eric S. Raymond, "The Art of UNIX Programming", pg 116
%%
"A data file metaformat is a set of syntactic and lexical conventions that is
either formally standardized or sufficiently well established by practice that
there are standard service libraries to handle marshaling and unmarshaling it."
	-- Eric S. Raymond, "The Art of UNIX Programming", pg 112
%%
"lu2 is very common Sumerian texts in its full meaning as "man". It is also
frequent as a head noun in relative clauses modifying animate antecedents;
clause such as that occurring in lines 4-5 can be understood and translated as
"the man who built", "the one who built", "he who built", and so on. Akkadian
scribes themselves sometimes translated lu2 as ša, the Akkadian relative
pronoun."
	-- John L. Hayes, "A Manual of Sumerian Grammar and Texts", pg 106
```

You get it.


#### When the hell would I use this?

Probably for the exact same reason I wrote it: for parsing the IANA subtag registry. Furthermore, I don't expect this script will invoke a loadbalancer-shattering level of demand, but it's nice knowing it might benefit somebody out there one day needing to build a list of BCP 47 tags.



## Usage

Create a new `RecordJar` instance by passing it a block of text as its first argument.

```js
var data = load("languages.txt");
var jar  = new RecordJar(data);
```

Then loop over its `.records` property, reading or matching whatever you need to:
```js
for(var i = 0; i < jar.records.length; ++i){
	console.log( jar.records[i] );
}
```

When adding new data, you needn't access the array methods of `.records` directly: RecordJar instances offer their own `.push` method for your convenience:
```js
jar.push({
	Name: "Waryfish",
	Kingdom: "Animalia",
	Genera: [
		"Ahliesaurus",
		"Luciosudis",
		"Scopelosaurus"
	]
});
```

Finally, when typecast to a string, RecordJars will produce compiled, serialisable versions of their contents in the same format they were designed to read:
```js
/** Either of the following two lines will work. You know the drill. */
var str = jar.toString();
var str = jar + "";

console.log(str);

/** Example output: **/
"Planet: Earth
Orbital-Radius: 149,600,000 km
Diameter: 12,756.3 km
Mass: 5.972e24 kg
Moons: Luna
%%
Name: Waryfish
Kingdom: Animalia
Genera: Ahliesaurus
Genera: Luciosudis
Genera: Scopelosaurus"
```
