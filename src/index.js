import peg from "pegjs"

const parser = peg.generate(`
emailAddress   = local "@" domain
local           = localWord ("." localWord)*
domain          = (subDomain ".")+ topDomain
localWord      = localChar+
subDomain      = subDomainChar+
topDomain      = topDomainChar topDomainChar topDomainChar? topDomainChar? topDomainChar? topDomainChar?
localChar      = alpha / num / special
subDomainChar = alpha / num / "-"
topDomainChar = alpha
alpha          = [A-Za-z]
num            = [0-9]
special        = "!"/ "#"/ "$"/ "%"/ "&"/ "'"/ "*"/ "+"/ "-"/ "/" / "=" / "?" / "^" / "_" / "\`" / "{" / "|" / "}" / "~"

`);

const container = document
    .getElementById("final");

const inputEl = container.querySelector("input");
const errorEl = container.querySelector(".DFA-test__error");

inputEl.addEventListener("input", (ev)=>{
    const {value} = ev.target ;
    try {
        parser.parse(value);
        errorEl.innerHTML="";
    } catch (e) {

        if (e.found) {
            errorEl.innerHTML = `${Array(e.location.start.offset).fill("&nbsp;").join("")}^ <br/>
            Нет, ну это уже слишком! Что это такое? `
        } else {
            errorEl.innerHTML = ` <br/>
            Здесь явно чего-то не хватает ...`
        }
        console.log(e)
    }
})
