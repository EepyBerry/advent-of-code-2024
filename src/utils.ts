export function setCharAt(str: string, index: number, chr: string) {
  if(index > str.length-1) {
    return str;
  }
  return str.substring(0,index) + chr + str.substring(index+1);
}

export function toAnswerString(n: number) {
  return numberPadEnd(n, 38, ' ');
}

export function numberPadEnd(n: number, width: number, pad: string) {
  return n.toString().padEnd(width, pad);
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
 * @remarks Default tokens are as follows:
 * - `%`: replaced by each replacement letter in the replacement string, in order of appearance
 * - `#`: replaced by the given replacement value
 */
type XBRgxOptions = {
  replace?: any;
  patch?: string;
  tokens?: string;
}

/**
 * eXtended Build ReGeX: creates a RegExp instance with the given options
 * @see {@link XBRgxOptions}
 * @param base 
 * @param tokens 
 * @param replacements 
 * @returns 
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
