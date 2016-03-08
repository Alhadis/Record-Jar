"use strict";

const RecordJar = require("../record-jar.js");
const Chai      = require("chai");
const ChaiDiff  = require("chai-diff");
const assert    = Chai.assert;
const expect    = Chai.expect;

Chai.should();
Chai.use(ChaiDiff);


const fixture   = `File-Date: 2014-12-17
%%
Type: variant
Subtag: unifon
Description: Unifon phonetic alphabet
Added: 2013-10-02
Prefix: en
Prefix: hup
Prefix: kyh
Prefix: tol
Prefix: yur
%%
Type: language
Subtag: aa
Description: Afar
Added: 2005-10-16
Pls: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elit lectus leo, congue ac leo id, vulputate pretium enim. Praesent congue, \\
	odio at placerat ultricies, mi libero \\\\
Pls: sed nisl sit amet metus volutpat malesuada eget nec orci. In \\
     Lacinia nulla, sit amet scelerisque nunc tortor et ligula. \\
     Maecenas sit amet ipsum ac est ullamcorper aliquet. Donec \\
     a ipsum volutpat, aliquet quam sed, eleifend neque. \\
     Pellentesque habitant morbi tristique senectus et netus et\\
     malesuada fames ac turpis egestas. Integer sed porta nisl&gt;
%%
Type: language
Subtag: ab
Description: Abkhazian
Added: 2005-10-16
Suppress-Script: Cyrl
%%
Type: language
Subtag: ae
Description: Avestan
Added: 2005-10-16
%%`;


const expectation = `File-Date: 2014-12-17
Subtag: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB\\
        BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB\\
        BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB\\
        BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB\\
        BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB\\
        BBBBBBBBBBBBBBBBBBB
%%
Type: variant
Subtag: unifon
Description: Unifon phonetic alphabet
Added: 2013-10-02
Prefix: en
Prefix: hup
Prefix: kyh
Prefix: tol
Prefix: yur
%%
Type: language
Subtag: aa
Description: Afar
Added: 2005-10-16
Pls: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse \\
     elit lectus leo, congue ac leo id, vulputate pretium enim. Praesent \\
     congue, odio at placerat ultricies, mi libero \\\\
Pls: sed nisl sit amet metus volutpat malesuada eget nec orci. In Lacinia \\
     nulla, sit amet scelerisque nunc tortor et ligula. Maecenas sit amet \\
     ipsum ac est ullamcorper aliquet. Donec a ipsum volutpat, aliquet quam \\
     sed, eleifend neque. Pellentesque habitant morbi tristique senectus et \\
     netus etmalesuada fames ac turpis egestas. Integer sed porta nisl&gt;\\
     &gt;
%%
Type: language
Subtag: ab
Description: Abkhazian
Added: 2005-10-16
Suppress-Script: Cyrl
%%
Type: language
Subtag: ae
Description: Avestan
Added: 2005-10-16
`;



describe("Extreme/stupid usage", () => {
     
     it("Handles lengthy lines and escaped backslashes correctly", () => {
          const jar = new RecordJar(fixture);
          jar.records[0].Subtag = "A".repeat(69) + "B".repeat(300);
          
          expect(jar.toString()).not.differentFrom(expectation);
     });
});
