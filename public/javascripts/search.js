const isFunction = _.isFunction;
const memoize = _.memoize;

/**
 * search utility class
 * provides case-insensitive search logic
 */
class SearchUtil {
  static defaultFn(substringToReturn) {
    return substringToReturn;
  }

  static resolveAndPush(destinationArray, ...itemsToPush) {
  	itemsToPush.forEach(insertVal => {
  		if (isFunction(insertVal)) {
  			insertVal = insertVal();
  		}
  		if (!insertVal) {
  			return;
  		}
  		destinationArray.push(insertVal);
  	});
  }

  /**
   * iterate through an array of strings
   * return a new array containing search results
   *
   * @param {array} arrayOfStrings - array of strings to search
   * @param {string} searchVal - search string
   * @param {function} formatMatchedSubstring - optionally transform matching substring I.E. bold matching text
   * @param {function} formatUnmatchedSubstring - optionally transform substrings I.E. wrap substrings in <span> elements
   * @return {array} returns an array of results
   *
   * ex. usage caseInsensitiveSearch(
   *   ['foo bar', 'foo 'foo'],
   *   'bar',
   *   val => (<span>{val}</span>),
   *   val => (<b className='bold'>{val}</b>)
   * )
   *
   * ex. result
   * [{
   *   isMatch: true,
   *   stringValue: 'foo bar',
   *   transformedValue: [
   *     (<span>foo </span>),
   *     (<b className='bold'>bar</b>),
   *   ]
   * }, {
   *   isMatch: false,
   *   stringValue: 'foo foo',
   *   transformedValue: null,
   * }]
   */
  static caseInsensitiveSearch(
    arrayOfStrings = [],
    searchVal = '',
    formatMatchedSubstring = this.defaultFn,
    formatUnmatchedSubstring = this.defaultFn
  ) {
  	if (!arrayOfStrings.length || !searchVal.length) {
  		return null;
  	}
  	const lowerCaseSearchVal = searchVal.toLowerCase();
  	const searchValLn = searchVal.length;
  	return arrayOfStrings.reduce(
      (filteredStrings, valOriginalCase) => {
        const result = { stringValue: valOriginalCase };
    		const lowerCaseItemVal = valOriginalCase.toLowerCase();
    		const unMatchedSubStrings = lowerCaseItemVal.split(lowerCaseSearchVal);
    		if (unMatchedSubStrings.length <= 1) {
    			return filteredStrings;
    		}
    		const parsedArray = [];
    		let walkIndex = 0;
    		unMatchedSubStrings.forEach(
          (inVal, inIndex) => {
      			const subStringLn = inVal.length;
      			const subStringEnd = walkIndex + subStringLn;
      			const searchMatchEnd = subStringEnd + searchValLn;
      			const subString = valOriginalCase.slice(walkIndex, subStringEnd);
      			function shouldShow() {
      				const matchedText = valOriginalCase.slice(subStringEnd, searchMatchEnd);
      				if (inIndex !== unMatchedSubStrings.length - 1) {
                // return substring that matches our search string;
                // eslint indent breaks on the next line 🤷‍♀️
                // eslint-disable-next-line indent
                return formatMatchedSubstring(matchedText); //eslint-disable-line
      				}
      				return null;
      			}
      			SearchUtil.resolveAndPush(parsedArray, formatUnmatchedSubstring(subString), shouldShow);
      			walkIndex = searchMatchEnd;
    		  }
        );

        result.isMatch = true;
        result.transformedValue = parsedArray;
        filteredStrings.push(result);
        return filteredStrings;
  	}, []);
  }

  static memoizeCaseInsensitiveSearch() {
    const resolver = (arrayOfStrings, searchVal) => {
      return searchVal;
    };
    const memoizedFn = memoize(
      this.caseInsensitiveSearch,
      resolver
    );
    const checkSubstringFirst = (
      arrayOfStrings,
      searchVal,
      formatMatchedSubstring = (x) => x,
      formatUnmatchedSubstring = (x) => x
    ) => {
      if (memoizedFn.cache.has(searchVal)) {
        return memoizedFn.cache.get(searchVal);
      }
      let arrayToSearch = arrayOfStrings;
      if (searchVal.length > 1) {
        let checkSubstring = String(searchVal);
        checkSubstring = checkSubstring.slice(0, -1);
        if (memoizedFn.cache.has(checkSubstring)) {
          const unfilteredResults = memoizedFn.cache.get(checkSubstring) || [];
          arrayToSearch = unfilteredResults.reduce(
            (filtered, option) => {
              if (option.isMatch) {
                filtered.push(option.stringValue);
              }
              return filtered;
            }, []);
        }
      }
      return memoizedFn(
        arrayToSearch,
        searchVal,
        formatMatchedSubstring,
        formatUnmatchedSubstring
      );
    };
    return checkSubstringFirst;
  }
}

window._SearchUtil = SearchUtil;
// export default SearchUtil;
