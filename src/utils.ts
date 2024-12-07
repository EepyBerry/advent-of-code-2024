export function setCharAt(str: string, index: number, chr: string) {
  if(index > str.length-1) {
    return str;
  }
  return str.substring(0,index) + chr + str.substring(index+1);
}
export function toAnswerString(n: number) {
  return numberPadEnd(n, 38, ' ');
}
export function patchString(str: string, patch: string, token: string = '#') {
  [...str.matchAll(new RegExp(`${token}`, 'g'))].forEach((match, idx) => {
    str = setCharAt(str, match.index, patch[idx])
  })
  return str
}

// --------------------------------------------------------------------------------------------------------------------

export function numberPadEnd(n: number, width: number, pad: string) {
  return n.toString().padEnd(width, pad);
}
export function ntob(n: number, r: number, length: number) {
  return n.toString(r).padStart(length, '0')
}

// --------------------------------------------------------------------------------------------------------------------

export function deepClone(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

// --------------------------------------------------------------------------------------------------------------------

export function countMatches(str: string, rgx: RegExp) {
  return [...str.matchAll(rgx)].length;
}

/**
 * XBRgx descriptor for RexExp string replacements:
 * - `replace`: replaces every value
 * - `patch`: replaced by the given replacement value
 * 
 * If necessary, you can specify the tokensto use in the following order, using the `tokens` property: `replace`,`patch`
 * 
 * @remarks Default tokens are as follows: `%#`
 */
type XBRgxOptions = {
  replace?: any;
  patch?: string;
  tokens?: string;
}

/**
 * eXtended Build ReGeX: creates a RegExp instance with the given options
 * @see {@link XBRgxOptions}
 * @param base base regex string **without flags**
 * @param replacements XBRgxOptions object with necessary data
 * @param tokens (*optional*) tokens to use for building
 * @returns the parsed and built RegExp isntance
 */
export function xbRgx(base: string, replacements: XBRgxOptions, flags: string = 'g'): RegExp {
  let parsed: string = '';
  if (!replacements.tokens) {
    replacements.tokens = '#%';
  }
  Object.keys(replacements).forEach(rk => {
    switch (rk) {
      case 'replace':
        const token = replacements.tokens![0];
        parsed = base.replaceAll(token, replacements.replace!.toString());
        break;
      case 'patch': {
        const token = replacements.tokens![1];
        [...parsed.matchAll(new RegExp(`${token}`, 'g'))].forEach((match, idx) => {
          parsed = setCharAt(parsed, match.index, replacements.patch![idx])
        });
        break;
      }
    }
  })
  return new RegExp(parsed, flags);
}
